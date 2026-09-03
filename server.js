require("dotenv").config();

const fs = require("fs");
const http = require("http");
const path = require("path");
const nodemailer = require("nodemailer");

const port = Number(process.env.PORT || 3000);
const root = __dirname;
const smtpUser = process.env.SMTP_USER || process.env.email;
const smtpPass = process.env.SMTP_PASS || process.env.password;
const frontendOrigin = (process.env.FRONTEND_ORIGIN || "").trim();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: Number(process.env.SMTP_PORT || 465),
    secure: process.env.SMTP_SECURE !== "false",
    auth: {
        user: smtpUser,
        pass: smtpPass
    }
});

function sendJson(response, status, body) {
    const headers = { "Content-Type": "application/json" };
    if (frontendOrigin) {
        headers["Access-Control-Allow-Origin"] = frontendOrigin;
        headers.Vary = "Origin";
    }
    response.writeHead(status, headers);
    response.end(JSON.stringify(body));
}

function readBody(request) {
    return new Promise((resolve, reject) => {
        let body = "";

        request.on("data", chunk => {
            body += chunk;
            if (body.length > 100000) {
                reject(new Error("Request is too large."));
                request.destroy();
            }
        });
        request.on("end", () => {
            try {
                resolve(JSON.parse(body || "{}"));
            } catch (error) {
                reject(new Error("Invalid JSON in request body."));
            }
        });
        request.on("error", reject);
    });
}

async function handleEmail(request, response) {
    try {
        if (!smtpUser || !smtpPass) {
            return sendJson(response, 500, { error: "Email service is not configured." });
        }

        const data = await readBody(request);
        const isExportInquiry = Boolean(data.companyName);
        const requiredFields = isExportInquiry
            ? ["companyName", "contactPerson", "country", "productInterest", "quantity", "destinationPort", "email", "phone"]
            : ["name", "email", "subject", "message"];

        if (requiredFields.some(field => !String(data[field] || "").trim())) {
            return sendJson(response, 400, { error: "Please complete all required fields." });
        }

        const subject = isExportInquiry
            ? `Export inquiry from ${data.companyName}`
            : data.subject;
        const details = Object.entries(data)
            .filter(([, value]) => String(value || "").trim())
            .map(([key, value]) => `${key}: ${value}`)
            .join("\n");

        const fromEmail = (smtpUser || "").trim();
        if (!fromEmail || !fromEmail.includes("@")) {
            throw new Error("Email service sender address is not configured correctly.");
        }

        const toEmail = (process.env.MAIL_TO || smtpUser || "").trim();
        if (!toEmail || !toEmail.includes("@")) {
            throw new Error("Email service recipient address is not configured correctly.");
        }

        await transporter.sendMail({
            from: fromEmail,
            to: toEmail,
            replyTo: data.email,
            subject,
            text: details
        });

        sendJson(response, 200, { message: "Email sent." });
    } catch (error) {
        const message = error && error.message ? error.message : "Unknown email error";
        console.error("Email sending failed:", message);

        const friendlyError = /invalid response|timeout|econnrefused|econnreset|auth/i.test(message)
            ? "The mail server rejected the connection or credentials. Please check the SMTP configuration."
            : "Unable to send your message right now.";

        sendJson(response, 500, { error: friendlyError });
    }
}

function serveFile(request, response) {
    let requestedPath;
    try {
        requestedPath = new URL(request.url, "http://localhost").pathname;
        requestedPath = decodeURIComponent(requestedPath);
    } catch (error) {
        response.writeHead(400);
        return response.end("Bad request");
    }

    const filePath = path.normalize(path.join(root, requestedPath === "/" ? "/index.html" : requestedPath));

    if (!filePath.startsWith(root) || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
        response.writeHead(404);
        return response.end("Not found");
    }

    const extension = path.extname(filePath);
    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "text/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".avif": "image/avif"
    };

    response.writeHead(200, { "Content-Type": contentTypes[extension] || "application/octet-stream" });
    fs.createReadStream(filePath).pipe(response);
}

const server = http.createServer((request, response) => {
    let requestPath;
    try {
        requestPath = new URL(request.url, "http://localhost").pathname;
    } catch (error) {
        response.writeHead(400);
        return response.end("Bad request");
    }

    if (request.method === "OPTIONS" && requestPath === "/api/send-email") {
        const headers = {
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        };
        if (frontendOrigin) {
            headers["Access-Control-Allow-Origin"] = frontendOrigin;
            headers.Vary = "Origin";
        }
        response.writeHead(204, headers);
        return response.end();
    }

    if (request.method === "POST" && requestPath === "/api/send-email") {
        return handleEmail(request, response);
    }

    if (request.method === "GET") {
        return serveFile(request, response);
    }

    sendJson(response, 405, { error: "Method not allowed." });
});

server.listen(port, () => {
    console.log(`MULTIPLAN server running at http://localhost:${port}`);
});
const forms = document.querySelectorAll("#contactForm, #exportInquiryForm");
const emailApiUrl = (typeof CONFIG !== "undefined" && CONFIG.emailApiUrl || "").trim();
const emailEndpoint = emailApiUrl || "/api/send-email";
const isStaticGithubPages = window.location.hostname.endsWith("github.io") && !emailApiUrl;

forms.forEach(form => {
    form.addEventListener("submit", async event => {
        event.preventDefault();

        const button = form.querySelector("button[type='submit']");
        const message = form.querySelector(".form-message, #formMessage");
        const originalText = button.textContent;

        button.disabled = true;
        button.textContent = "Sending...";
        message.textContent = "";

        try {
            if (isStaticGithubPages) {
                throw new Error("Email service is not configured for this website yet. Set CONFIG.emailApiUrl to the public Node.js server endpoint.");
            }

            const response = await fetch(emailEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
            });

            const responseText = await response.text();
            let result = {};
            const contentType = (response.headers.get("content-type") || "").toLowerCase();

            if (responseText) {
                if (contentType.includes("application/json")) {
                    try {
                        result = JSON.parse(responseText);
                    } catch {
                        throw new Error("The email server returned an invalid JSON response.");
                    }
                } else if (contentType.includes("text/html")) {
                    throw new Error("The email backend is not available in this deployment. Make sure the server is running and the /api/send-email route is reachable.");
                } else {
                    try {
                        result = JSON.parse(responseText);
                    } catch {
                        result = { error: responseText.trim() || "Email service is unavailable. Please try again later." };
                    }
                }
            }

            if (!response.ok) {
                throw new Error(result.error || "Email service is unavailable. Please try again later.");
            }

            message.textContent = "Thank you. Your message has been sent.";
            form.reset();
        } catch (error) {
            message.textContent = error.message;
        } finally {
            button.disabled = false;
            button.textContent = originalText;
        }
    });
});
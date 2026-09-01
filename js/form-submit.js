const forms = document.querySelectorAll("#contactForm, #exportInquiryForm");

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
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(new FormData(form)))
            });
            const responseText = await response.text();
            let result = {};

            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                } catch {
                    throw new Error("The email server returned an invalid response.");
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
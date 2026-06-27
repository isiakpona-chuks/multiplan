// =====================================
// FAQ ACCORDION
// =====================================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

    question.addEventListener("click", () => {

        const answer =
            question.nextElementSibling;

        document
            .querySelectorAll(".faq-answer")
            .forEach(item => {

                if (item !== answer) {
                    item.style.display = "none";
                }

            });

        answer.style.display =
            answer.style.display === "block"
            ? "none"
            : "block";

    });

});

// =====================================
// CONTACT FORM
// =====================================

const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function(e) {

            e.preventDefault();

            const inputs =
                contactForm.querySelectorAll(
                    "input[required], textarea[required]"
                );

            let valid = true;

            inputs.forEach(input => {

                if (!input.value.trim()) {

                    valid = false;
                    input.style.borderColor =
                        "red";

                } else {

                    input.style.borderColor =
                        "#ddd";
                }

            });

            if (valid) {

                alert(
                    "Thank you! Your message has been received."
                );

                contactForm.reset();
            }

        }
    );

}
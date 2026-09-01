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


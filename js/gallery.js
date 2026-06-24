/*=====================================
  GALLERY FILTER
=====================================*/

const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

if (filterButtons.length && cards.length) {

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelector(".filter-btn.active")
                ?.classList.remove("active");

            button.classList.add("active");

            const filter = button.dataset.filter;

            cards.forEach(card => {

                card.style.display =
                    filter === "all" || card.classList.contains(filter)
                        ? "block"
                        : "none";

            });

        });

    });

}

/*=====================================
  LIGHTBOX
=====================================*/

const images = document.querySelectorAll(".card img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const close = document.querySelector(".close");

if (images.length && lightbox && lightboxImg && close) {

    images.forEach(img => {

        img.addEventListener("click", () => {

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;

        });

    });

    close.addEventListener("click", () => {

        lightbox.style.display = "none";

    });

    lightbox.addEventListener("click", e => {

        if (e.target === lightbox) {

            lightbox.style.display = "none";

        }

    });

}
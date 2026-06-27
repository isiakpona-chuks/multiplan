// =====================================
// GALLERY FILTER
// =====================================

const filterButtons = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-card");

filterButtons.forEach(button => {
  button.addEventListener("click", event => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");

    const filter = event.currentTarget.dataset.filter.toLowerCase();

    galleryItems.forEach(item => {
      const shouldShow = filter === "all" || item.classList.contains(filter);
      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

// =====================================
// LIGHTBOX
// =====================================

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

const galleryImages = document.querySelectorAll(".gallery-card img");
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightbox.classList.add("open");
  lightboxImg.src = galleryImages[currentIndex].src;
  document.body.style.overflow = "hidden"; // prevent background scroll
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = ""; // restore scroll
}

function showImage(index) {
  currentIndex = (index + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentIndex].src;
}

// Event delegation for gallery images
const galleryGrid = document.querySelector(".gallery-grid");

if (galleryGrid) {
  galleryGrid.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
      const index = [...galleryImages].indexOf(e.target);
      openLightbox(index);
    }
  });
}

// Controls
closeBtn.addEventListener("click", closeLightbox);
prevBtn.addEventListener("click", () => showImage(currentIndex - 1));
nextBtn.addEventListener("click", () => showImage(currentIndex + 1));

// Close when clicking outside image
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;

  switch (e.key) {
    case "Escape":
      closeLightbox();
      break;
    case "ArrowLeft":
      showImage(currentIndex - 1);
      break;
    case "ArrowRight":
      showImage(currentIndex + 1);
      break;
  }
});

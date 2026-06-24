/*=====================================
  HERO SLIDER
=====================================*/

const hero = document.querySelector('.hero');
const heading = document.getElementById('hero-heading');
const title = document.querySelector('.hero-title');
const badge = document.querySelector('.hero-badge');
const description = document.querySelector('.hero-description');
const buttons = document.querySelector('.hero-buttons');
const dotsContainer = document.getElementById('heroDots');

const nextBtn = document.getElementById('nextSlide');
const prevBtn = document.getElementById('prevSlide');

let currentSlide = 0;
let sliderInterval = null;
let dots = [];

// Cache all animatable elements
const textElements = [title, heading, badge, description, buttons];

function renderSlide(index) {
    const slide = HERO_SLIDES[index];
    if (!slide || !hero) return;

    title.textContent = slide.subtitle;
    heading.textContent = slide.title;
    badge.textContent = `🌱 RC: ${CONFIG.company.rc} • Sustainable Agriculture Since ${CONFIG.company.established}`;
    description.textContent = slide.description;

    hero.style.backgroundImage = `
        linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), 
        url('${slide.image}')
    `;
}

function animateHeroText() {
    textElements.forEach((element, index) => {
        if (!element) return;

        // Remove all animation classes
        element.classList.remove(
            'fade-up',
            'fade-delay-1',
            'fade-delay-2',
            'fade-delay-3',
            'fade-delay-4',
            'fade-delay-5'
        );

        // Force reflow to restart animation
        void element.offsetWidth;

        // Apply base animation + staggered delay
        element.classList.add('fade-up');
        element.classList.add(`fade-delay-${index + 1}`);
    });
}

function updateActiveDot() {
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function createDots() {
    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    dots = [];

    HERO_SLIDES.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('hero-dot');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
        dots.push(dot);
    });
}

function goToSlide(index) {
    currentSlide = (index + HERO_SLIDES.length) % HERO_SLIDES.length;
    renderSlide(currentSlide);
    animateHeroText();
    updateActiveDot();
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function startAutoSlide() {
    if (sliderInterval) clearInterval(sliderInterval);
    sliderInterval = setInterval(nextSlide, CONFIG.slider.speed);
}

function stopAutoSlide() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
        sliderInterval = null;
    }
}

// Initialize
function initHeroSlider() {
    if (!hero || !HERO_SLIDES?.length) {
        console.warn('Hero slider: Missing hero element or slides data');
        return;
    }

    createDots();

    // Initial render
    renderSlide(0);
    animateHeroText();
    updateActiveDot();

    // Button listeners
    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', previousSlide);

    // Auto-slide
    startAutoSlide();

    // Pause on hover
    hero.addEventListener('mouseenter', stopAutoSlide);
    hero.addEventListener('mouseleave', startAutoSlide);
}

// Run initialization
initHeroSlider();
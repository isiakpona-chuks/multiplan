const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;

      const target = +counter.dataset.target;

      let current = 0;

      const increment = Math.ceil(target / 80);

      const update = () => {
        current += increment;

        if (current >= target) {
          counter.textContent = target;
        } else {
          counter.textContent = current;

          requestAnimationFrame(update);
        }
      };

      update();

      observer.unobserve(counter);
    });
  },
  {
    threshold: 0.5,
  },
);

counters.forEach((counter) => {
  observer.observe(counter);
});

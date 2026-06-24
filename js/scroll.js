/*=====================================
  SCROLL REVEAL
=====================================*/

/**
 * Initializes Intersection Observer for scroll reveal animations
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    if (!reveals.length) return;

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Optional: Stop observing after revealing (better performance)
                    // revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,        // 20% of element visible
            rootMargin: '0px 0px -50px 0px' // Trigger a bit earlier
        }
    );

    reveals.forEach(element => {
        revealObserver.observe(element);
    });

    // Optional: Return observer for manual control if needed
    return revealObserver;
}

// Initialize
initScrollReveal();
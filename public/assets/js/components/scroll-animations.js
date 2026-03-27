/**
 * Scroll Animation Component - Enhanced with Bidirectional Behavior
 * Uses IntersectionObserver to trigger animations when elements enter/exit viewport
 */

function initScrollAnimations() {
    // Select all elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.scroll-animate');

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        // Fallback: make all elements visible immediately
        animatedElements.forEach(el => el.classList.add('is-visible'));
        return;
    }

    // Configure the observer for bidirectional behavior
    const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px -80px 0px', // Trigger slightly before element is fully visible
        threshold: 0.15 // Trigger when 15% of element is visible
    };

    // Create the observer with bidirectional logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // When element enters viewport
            if (entry.isIntersecting) {
                // Add visible class to trigger appear animation
                entry.target.classList.add('is-visible');
            } else {
                // When element exits viewport
                // Remove visible class to trigger disappear animation
                entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}

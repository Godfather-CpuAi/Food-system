// home.js - Interactive features for home page

/**
 * Animate counter numbers
 */
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                // Handle decimal numbers (like 4.8)
                if (target % 1 !== 0) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        updateCounter();
    });
}

/**
 * Animate boxes on scroll
 */
function animateOnScroll() {
    const boxes = document.querySelectorAll('.animate-box');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    }, {
        threshold: 0.1
    });
    
    boxes.forEach(box => observer.observe(box));
}

/**
 * Add floating animation to feature icons
 */
function addFloatingAnimation() {
    const icons = document.querySelectorAll('.feature-icon');
    
    icons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.2}s`;
    });
}

/**
 * Initialize all animations when page loads
 */
document.addEventListener('DOMContentLoaded', function() {
    // Start counter animation after a short delay
    setTimeout(() => {
        animateCounters();
    }, 500);
    
    // Initialize scroll animations
    animateOnScroll();
    
    // Add floating animation to icons
    addFloatingAnimation();
    
    // Add pulse effect to category cards on hover
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.category-icon').style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.category-icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });
});

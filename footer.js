// footer.js - Load footer dynamically on all pages

/**
 * Load footer from footer.html file
 */
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            // Create a placeholder div if it doesn't exist
            let footerPlaceholder = document.getElementById('footer-placeholder');
            if (!footerPlaceholder) {
                footerPlaceholder = document.createElement('div');
                footerPlaceholder.id = 'footer-placeholder';
                document.body.appendChild(footerPlaceholder);
            }
            footerPlaceholder.innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Load footer when DOM is ready
document.addEventListener('DOMContentLoaded', loadFooter);

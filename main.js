// main.js - Common functions used across all pages

/**
 * Load footer dynamically from footer.html file
 */
function loadFooter() {
    // Use XMLHttpRequest for better compatibility with file:// protocol
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'footer.html', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 0) { // 0 for file:// protocol
                const footerPlaceholder = document.getElementById('footer-placeholder');
                if (footerPlaceholder) {
                    footerPlaceholder.innerHTML = xhr.responseText;
                }
            } else {
                console.error('Error loading footer:', xhr.status);
            }
        }
    };
    xhr.send();
}

/**
 * Update cart count badge in navigation
 * This function reads cart from localStorage and updates the badge
 */
function updateCartCount() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Get cart from localStorage (returns null if not found)
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total items in cart
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    // Update the badge in navigation
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        if (currentUser) {
            // User is logged in - show cart count
            cartCountElement.textContent = totalItems;
            cartCountElement.style.display = 'inline-block';
        } else {
            // User is not logged in - hide cart count
            cartCountElement.textContent = '0';
            cartCountElement.style.display = 'inline-block';
        }
    }
}

/**
 * Check if user is logged in and update navigation
 */
function checkLoginStatus() {
    // Get current user from sessionStorage
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    const authLink = document.getElementById('authLink');
    if (authLink) {
        if (currentUser) {
            // User is logged in - show profile icon with first letter
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(u => u.email === currentUser.email);
            
            if (user) {
                const firstLetter = user.name.charAt(0).toUpperCase();
                authLink.innerHTML = `<span class="profile-icon">${firstLetter}</span>`;
                authLink.href = 'profile.html';
                authLink.onclick = null;
                authLink.title = 'View Profile';
            }
        } else {
            // User is not logged in - show login option
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
            authLink.onclick = null;
            authLink.title = 'Login';
        }
    }
}

/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html') ||
            (currentPage === 'index.html' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Logout function - clears user session
 */
function logout() {
    // Remove current user from sessionStorage
    sessionStorage.removeItem('currentUser');
    
    // Show alert
    alert('Logged out successfully!');
    
    // Redirect to home page
    window.location.href = 'index.html';
}

/**
 * Show notification message
 */
function showNotification(message, type = 'success') {
    alert(message);
}

// Run these functions when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadFooter();
    updateCartCount();
    checkLoginStatus();
    updateActiveNavLink();
});

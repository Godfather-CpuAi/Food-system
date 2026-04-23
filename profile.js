// profile.js - Handles profile page functionality

/**
 * Load and display user profile information
 */
function loadProfile() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // User not logged in - redirect to login page
        alert('Please login to view your profile!');
        window.location.href = 'login.html';
        return;
    }
    
    // Get user data from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === currentUser.email);
    
    if (!user) {
        alert('User data not found!');
        window.location.href = 'login.html';
        return;
    }
    
    // Display profile information
    displayProfileInfo(user);
    
    // Load order history
    loadOrderHistory(currentUser.email);
}

/**
 * Display user profile information
 */
function displayProfileInfo(user) {
    // Get first letter of name for avatar
    const firstLetter = user.name.charAt(0).toUpperCase();
    
    // Update profile avatar
    const avatarElement = document.getElementById('profileAvatar');
    if (avatarElement) {
        avatarElement.textContent = firstLetter;
    }
    
    // Update profile name and email in sidebar
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = user.name;
    }
    
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) {
        profileEmail.textContent = user.email;
    }
    
    // Update detailed information
    const detailName = document.getElementById('detailName');
    if (detailName) {
        detailName.textContent = user.name;
    }
    
    const detailEmail = document.getElementById('detailEmail');
    if (detailEmail) {
        detailEmail.textContent = user.email;
    }
    
    const detailPhone = document.getElementById('detailPhone');
    if (detailPhone) {
        detailPhone.textContent = user.phone || 'Not provided';
    }
    
    const detailJoined = document.getElementById('detailJoined');
    if (detailJoined) {
        // Format the joined date
        const joinedDate = user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : 'Recently';
        detailJoined.textContent = joinedDate;
    }
}

/**
 * Load and display order history
 */
function loadOrderHistory(userEmail) {
    // Get all orders from localStorage
    const allOrders = JSON.parse(localStorage.getItem('orderHistory')) || {};
    const userOrders = allOrders[userEmail] || [];
    
    // Update statistics
    updateOrderStatistics(userOrders);
    
    // Display recent orders
    displayRecentOrders(userOrders);
}

/**
 * Update order statistics
 */
function updateOrderStatistics(orders) {
    const totalOrders = orders.length;
    const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
    const rewardPoints = Math.floor(totalSpent / 100); // 1 point per ₹100 spent
    
    // Update the statistics display
    const statsHTML = `
        <div class="col-md-4 mb-3">
            <div class="stat-card p-3">
                <div class="stat-icon">📦</div>
                <h3 class="text-danger mb-0">${totalOrders}</h3>
                <p class="text-muted mb-0">Total Orders</p>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="stat-card p-3">
                <div class="stat-icon">💰</div>
                <h3 class="text-success mb-0">₹${totalSpent}</h3>
                <p class="text-muted mb-0">Total Spent</p>
            </div>
        </div>
        <div class="col-md-4 mb-3">
            <div class="stat-card p-3">
                <div class="stat-icon">⭐</div>
                <h3 class="text-warning mb-0">${rewardPoints}</h3>
                <p class="text-muted mb-0">Reward Points</p>
            </div>
        </div>
    `;
    
    const statsContainer = document.querySelector('.row.text-center');
    if (statsContainer) {
        statsContainer.innerHTML = statsHTML;
    }
}

/**
 * Display recent orders
 */
function displayRecentOrders(orders) {
    const recentOrdersContainer = document.querySelector('.card.mt-4 .card-body');
    
    if (!recentOrdersContainer) return;
    
    if (orders.length === 0) {
        recentOrdersContainer.innerHTML = `
            <h4 class="mb-3">Recent Orders</h4>
            <div class="text-center text-muted py-4">
                <p>No orders yet. Start ordering delicious food!</p>
                <a href="menu.html" class="btn btn-danger">Browse Menu</a>
            </div>
        `;
        return;
    }
    
    // Show only last 5 orders
    const recentOrders = orders.slice(0, 5);
    
    let ordersHTML = '<h4 class="mb-3">Recent Orders</h4>';
    
    recentOrders.forEach(order => {
        const orderDate = new Date(order.orderDate).toLocaleDateString();
        const orderTime = new Date(order.orderDate).toLocaleTimeString();
        
        ordersHTML += `
            <div class="order-item mb-3 p-3 bg-light rounded">
                <div class="row">
                    <div class="col-md-8">
                        <h6 class="mb-1">Order #${order.orderId}</h6>
                        <p class="text-muted small mb-1">📅 ${orderDate} at ${orderTime}</p>
                        <p class="text-muted small mb-1">📍 ${order.deliveryAddress}</p>
                        <p class="mb-0"><strong>${order.items.length} item(s)</strong> - ${order.items.map(item => item.name).join(', ')}</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <h5 class="text-success mb-1">₹${order.total}</h5>
                        <span class="badge bg-success">${order.status}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    recentOrdersContainer.innerHTML = ordersHTML;
}

// Load profile when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProfile();
});

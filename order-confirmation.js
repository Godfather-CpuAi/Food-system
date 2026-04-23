// order-confirmation.js - Displays order confirmation details

/**
 * Display order confirmation details
 */
function displayOrderConfirmation() {
    // Get order from sessionStorage
    const order = JSON.parse(sessionStorage.getItem('currentOrder'));
    
    // If no order found, redirect to home
    if (!order) {
        alert('No order found!');
        window.location.href = 'index.html';
        return;
    }
    
    // Display order details
    document.getElementById('orderId').textContent = order.orderId;
    document.getElementById('customerName').textContent = order.customerName;
    document.getElementById('deliveryAddress').textContent = order.deliveryAddress;
    document.getElementById('orderTotal').textContent = `₹${order.total}`;
    
    // Display order items
    const orderItemsContainer = document.getElementById('orderItems');
    orderItemsContainer.innerHTML = '';
    
    order.items.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'border-bottom pb-2 mb-2';
        
        itemDiv.innerHTML = `
            <div class="d-flex justify-content-between">
                <span>${item.name} x ${item.quantity}</span>
                <span>₹${item.price * item.quantity}</span>
            </div>
        `;
        
        orderItemsContainer.appendChild(itemDiv);
    });
}

// Load order confirmation when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayOrderConfirmation();
});

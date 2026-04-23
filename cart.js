// cart.js - Handles cart page functionality

/**
 * Display cart items on the page
 */
function displayCart() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // User is not logged in - show message and redirect
        alert('Please login to view your cart!');
        window.location.href = 'login.html';
        return;
    }
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCartDiv = document.getElementById('emptyCart');
    const cartSummaryDiv = document.getElementById('cartSummary');
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        emptyCartDiv.style.display = 'block';
        cartSummaryDiv.style.display = 'none';
        return;
    }
    
    // Hide empty cart message and show cart items
    emptyCartDiv.style.display = 'none';
    cartSummaryDiv.style.display = 'block';
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    // Display each cart item
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <div class="row align-items-center">
                <div class="col-md-2">
                    <img src="${item.image}" alt="${item.name}" class="img-fluid">
                </div>
                <div class="col-md-4">
                    <h5>${item.name}</h5>
                    <p class="text-muted">₹${item.price} each</p>
                </div>
                <div class="col-md-3">
                    <div class="input-group">
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <button class="btn btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
                    </div>
                </div>
                <div class="col-md-2">
                    <strong>₹${item.price * item.quantity}</strong>
                </div>
                <div class="col-md-1">
                    <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">
                        🗑️
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Update cart summary
    updateCartSummary();
}

/**
 * Update quantity of an item in cart
 */
function updateQuantity(index, change) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Update quantity
    cart[index].quantity += change;
    
    // Remove item if quantity becomes 0
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    
    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh display
    displayCart();
    updateCartCount();
}

/**
 * Remove item from cart
 */
function removeFromCart(index) {
    // Confirm before removing
    if (!confirm('Are you sure you want to remove this item?')) {
        return;
    }
    
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Remove item
    cart.splice(index, 1);
    
    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Refresh display
    displayCart();
    updateCartCount();
}

/**
 * Update cart summary (subtotal and total)
 */
function updateCartSummary() {
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate subtotal
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Delivery fee
    const deliveryFee = 40;
    
    // Calculate total
    const total = subtotal + deliveryFee;
    
    // Update display
    document.getElementById('subtotal').textContent = `₹${subtotal}`;
    document.getElementById('total').textContent = `₹${total}`;
}

/**
 * Proceed to checkout
 */
function proceedToCheckout() {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        alert('Please login to place an order!');
        window.location.href = 'login.html';
        return;
    }
    
    // Check if cart is empty
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 40;
    
    // Update modal total
    document.getElementById('modalTotal').textContent = `₹${total}`;
    
    // Show payment modal
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));
    paymentModal.show();
}

/**
 * Select payment method
 */
function selectPayment(method) {
    // Uncheck all radio buttons
    document.querySelectorAll('input[name="payment"]').forEach(radio => {
        radio.checked = false;
    });
    
    // Check selected radio button
    document.getElementById(method).checked = true;
    
    // Remove active class from all options
    document.querySelectorAll('.payment-option').forEach(option => {
        option.classList.remove('active');
    });
    
    // Add active class to selected option
    event.target.closest('.payment-option').classList.add('active');
}

/**
 * Confirm payment and place order
 */
function confirmPayment() {
    // Get delivery address
    const address = document.getElementById('deliveryAddress').value.trim();
    if (!address) {
        alert('Please enter your delivery address!');
        return;
    }
    
    // Get selected payment method
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method!');
        return;
    }
    
    const paymentMethod = selectedPayment.value;
    const paymentNames = {
        'cod': 'Cash on Delivery',
        'upi': 'UPI Payment',
        'card': 'Credit/Debit Card',
        'wallet': 'Digital Wallet'
    };
    
    // For online payment methods, ask for confirmation
    if (paymentMethod !== 'cod') {
        const confirmed = confirm(`You selected ${paymentNames[paymentMethod]}.\n\nFor this demo, we'll simulate the payment.\n\nClick OK to confirm payment is completed.`);
        if (!confirmed) {
            return;
        }
    }
    
    // Get current user
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Get cart
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculate total
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal + 40;
    
    // Create order object
    const order = {
        orderId: 'ORD' + Date.now(),
        customerName: currentUser.name,
        customerEmail: currentUser.email,
        deliveryAddress: address,
        items: cart,
        subtotal: subtotal,
        deliveryFee: 40,
        total: total,
        paymentMethod: paymentNames[paymentMethod],
        paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Paid',
        orderDate: new Date().toISOString(),
        status: 'Confirmed'
    };
    
    // Save order to user's order history
    saveOrderToHistory(order);
    
    // Save order to sessionStorage for confirmation page
    sessionStorage.setItem('currentOrder', JSON.stringify(order));
    
    // Clear cart
    localStorage.removeItem('cart');
    
    // Close modal
    const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
    paymentModal.hide();
    
    // Show success message
    alert(`Payment ${paymentMethod === 'cod' ? 'method selected' : 'confirmed'}! Your order has been placed.`);
    
    // Redirect to order confirmation page
    window.location.href = 'order-confirmation.html';
}

/**
 * Save order to user's order history
 */
function saveOrderToHistory(order) {
    // Get current user
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    // Get all orders from localStorage
    let allOrders = JSON.parse(localStorage.getItem('orderHistory')) || {};
    
    // Initialize user's orders array if it doesn't exist
    if (!allOrders[currentUser.email]) {
        allOrders[currentUser.email] = [];
    }
    
    // Add new order to user's history
    allOrders[currentUser.email].unshift(order); // Add to beginning of array
    
    // Save back to localStorage
    localStorage.setItem('orderHistory', JSON.stringify(allOrders));
}

// Load cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCart();
});

// menu.js - Handles menu display and add to cart functionality

/**
 * All menu items organized by restaurant
 * isVeg: true = Vegetarian, false = Non-Vegetarian
 */
const allMenuItems = [
    // Pizza Paradise Items
    { id: 101, name: 'Margherita Pizza', price: 199, image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop', category: 'Pizza', description: 'Classic pizza with tomato, mozzarella & basil', restaurant: 'Pizza Paradise', isVeg: true },
    { id: 102, name: 'Pepperoni Pizza', price: 249, image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop', category: 'Pizza', description: 'Loaded with pepperoni and cheese', restaurant: 'Pizza Paradise', isVeg: false },
    { id: 103, name: 'Veggie Pizza', price: 229, image: 'https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop', category: 'Pizza', description: 'Fresh vegetables with cheese', restaurant: 'Pizza Paradise', isVeg: true },
    { id: 104, name: 'BBQ Chicken Pizza', price: 279, image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop', category: 'Pizza', description: 'BBQ sauce, chicken & onions', restaurant: 'Pizza Paradise', isVeg: false },
    
    // Burger King's Items
    { id: 201, name: 'Classic Burger', price: 149, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop', category: 'Burgers', description: 'Juicy beef patty with lettuce & tomato', restaurant: "Burger King's", isVeg: false },
    { id: 202, name: 'Cheese Burger', price: 169, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400&h=300&fit=crop', category: 'Burgers', description: 'Double cheese with special sauce', restaurant: "Burger King's", isVeg: false },
    { id: 203, name: 'Bacon Burger', price: 199, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop', category: 'Burgers', description: 'Crispy bacon with beef patty', restaurant: "Burger King's", isVeg: false },
    { id: 204, name: 'Veggie Burger', price: 139, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=400&h=300&fit=crop', category: 'Burgers', description: 'Healthy veggie patty', restaurant: "Burger King's", isVeg: true },
    
    // Spice Garden Items
    { id: 301, name: 'Chicken Biryani', price: 249, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop', category: 'Indian', description: 'Aromatic basmati rice with chicken', restaurant: 'Spice Garden', isVeg: false },
    { id: 302, name: 'Butter Chicken', price: 279, image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&h=300&fit=crop', category: 'Indian', description: 'Creamy tomato curry with chicken', restaurant: 'Spice Garden', isVeg: false },
    { id: 303, name: 'Paneer Tikka', price: 199, image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&h=300&fit=crop', category: 'Indian', description: 'Grilled cottage cheese with spices', restaurant: 'Spice Garden', isVeg: true },
    { id: 304, name: 'Dal Makhani', price: 159, image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&h=300&fit=crop', category: 'Indian', description: 'Creamy black lentils', restaurant: 'Spice Garden', isVeg: true },
    
    // Taco Fiesta Items
    { id: 401, name: 'Chicken Tacos', price: 179, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop', category: 'Mexican', description: 'Soft tacos with grilled chicken', restaurant: 'Taco Fiesta', isVeg: false },
    { id: 402, name: 'Beef Burrito', price: 199, image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=300&fit=crop', category: 'Mexican', description: 'Large burrito with beef & beans', restaurant: 'Taco Fiesta', isVeg: false },
    { id: 403, name: 'Nachos Supreme', price: 149, image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400&h=300&fit=crop', category: 'Mexican', description: 'Crispy nachos with cheese & salsa', restaurant: 'Taco Fiesta', isVeg: true },
    { id: 404, name: 'Quesadilla', price: 169, image: 'https://images.unsplash.com/photo-1618040996337-56904b7850b9?w=400&h=300&fit=crop', category: 'Mexican', description: 'Grilled tortilla with cheese', restaurant: 'Taco Fiesta', isVeg: true },
    
    // Dragon Wok Items
    { id: 501, name: 'Hakka Noodles', price: 159, image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop', category: 'Chinese', description: 'Stir-fried noodles with vegetables', restaurant: 'Dragon Wok', isVeg: true },
    { id: 502, name: 'Fried Rice', price: 149, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop', category: 'Chinese', description: 'Wok-tossed rice with veggies', restaurant: 'Dragon Wok', isVeg: true },
    { id: 503, name: 'Manchurian', price: 179, image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop', category: 'Chinese', description: 'Crispy vegetable balls in sauce', restaurant: 'Dragon Wok', isVeg: true },
    { id: 504, name: 'Spring Rolls', price: 99, image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=300&fit=crop', category: 'Chinese', description: 'Crispy vegetable spring rolls', restaurant: 'Dragon Wok', isVeg: true },
    
    // Sandwiches
    { id: 601, name: 'Veg Sandwich', price: 99, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop', category: 'Sandwiches', description: 'Fresh veggies with mint chutney', restaurant: 'Sandwich Corner', isVeg: true },
    { id: 602, name: 'Grilled Sandwich', price: 129, image: 'https://images.unsplash.com/photo-1621852004158-f3bc188ace2d?w=400&h=300&fit=crop', category: 'Sandwiches', description: 'Grilled to perfection with cheese', restaurant: 'Sandwich Corner', isVeg: true },
    { id: 603, name: 'Club Sandwich', price: 159, image: 'https://images.unsplash.com/photo-1567234669003-dce7a7a88821?w=400&h=300&fit=crop', category: 'Sandwiches', description: 'Triple layer with chicken & veggies', restaurant: 'Sandwich Corner', isVeg: false },
    { id: 604, name: 'Paneer Sandwich', price: 119, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop', category: 'Sandwiches', description: 'Grilled paneer with spices', restaurant: 'Sandwich Corner', isVeg: true },
    
    // Drinks
    { id: 701, name: 'Coca Cola', price: 40, image: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop', category: 'Drinks', description: 'Chilled cola drink', restaurant: 'All Restaurants', isVeg: true },
    { id: 702, name: 'Fresh Juice', price: 60, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop', category: 'Drinks', description: 'Freshly squeezed orange juice', restaurant: 'All Restaurants', isVeg: true },
    { id: 703, name: 'Iced Tea', price: 50, image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop', category: 'Drinks', description: 'Refreshing lemon iced tea', restaurant: 'All Restaurants', isVeg: true },
    { id: 704, name: 'Mango Shake', price: 70, image: 'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=400&h=300&fit=crop', category: 'Drinks', description: 'Thick & creamy mango shake', restaurant: 'All Restaurants', isVeg: true }
];

// Current filter state
let currentFilter = 'all'; // 'all', 'veg', 'nonveg'

/**
 * Get restaurant ID from URL
 */
function getRestaurantFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('restaurant');
}

/**
 * Filter items by restaurant and veg/non-veg
 */
function getFilteredItems() {
    const restaurantId = getRestaurantFromURL();
    let items = allMenuItems;
    
    // Filter by restaurant
    if (restaurantId) {
        const restaurantMap = {
            '1': 'Pizza Paradise',
            '2': "Burger King's",
            '3': 'Spice Garden',
            '4': 'Taco Fiesta',
            '5': 'Dragon Wok',
            '7': 'Sandwich Corner'
        };
        
        const restaurantName = restaurantMap[restaurantId];
        if (restaurantName) {
            items = items.filter(item => item.restaurant === restaurantName);
        }
    }
    
    // Filter by veg/non-veg
    if (currentFilter === 'veg') {
        items = items.filter(item => item.isVeg === true);
    } else if (currentFilter === 'nonveg') {
        items = items.filter(item => item.isVeg === false);
    }
    
    return items;
}

/**
 * Set filter and refresh menu
 */
function setFilter(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
    
    // Refresh menu display
    displayMenu();
}

/**
 * Display menu items grouped by category
 */
function displayMenu() {
    const items = getFilteredItems();
    const container = document.getElementById('menuContainer');
    
    if (!container) return;
    
    // Update page title if specific restaurant
    const restaurantId = getRestaurantFromURL();
    if (restaurantId) {
        const pageTitle = document.querySelector('h2');
        const restaurantItem = items[0];
        if (pageTitle && restaurantItem) {
            pageTitle.textContent = `${restaurantItem.restaurant} - Menu`;
        }
    }
    
    // Group items by category
    const categories = {};
    items.forEach(item => {
        if (!categories[item.category]) {
            categories[item.category] = [];
        }
        categories[item.category].push(item);
    });
    
    // Clear container
    container.innerHTML = '';
    
    // Display each category
    Object.keys(categories).forEach((category, index) => {
        const section = document.createElement('div');
        section.className = 'category-section';
        
        const categoryTitle = document.createElement('h3');
        categoryTitle.className = 'category-title mb-4 mt-5';
        categoryTitle.innerHTML = `${getCategoryEmoji(category)} ${category}`;
        section.appendChild(categoryTitle);
        
        const row = document.createElement('div');
        row.className = 'row';
        
        categories[category].forEach((item, itemIndex) => {
            const col = document.createElement('div');
            col.className = 'col-md-4 col-sm-6 mb-4';
            
            // Get veg/non-veg indicator
            const vegIndicator = item.isVeg 
                ? '<span class="veg-indicator" title="Vegetarian">🟢</span>' 
                : '<span class="nonveg-indicator" title="Non-Vegetarian">🔴</span>';
            
            col.innerHTML = `
                <div class="card menu-card animate-card" style="animation-delay: ${itemIndex * 0.1}s">
                    <div class="menu-card-image-wrapper">
                        <img src="${item.image}" class="card-img-top" alt="${item.name}">
                    </div>
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${item.name}</h5>
                            ${vegIndicator}
                        </div>
                        <p class="card-text text-muted small">${item.description}</p>
                        <p class="restaurant-tag">
                            <span class="badge bg-secondary">${item.restaurant}</span>
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="price mb-0">₹${item.price}</p>
                            <button class="btn btn-danger btn-add-cart" onclick="addToCart(${item.id})">
                                <span class="cart-icon">🛒</span> Add
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            row.appendChild(col);
        });
        
        section.appendChild(row);
        container.appendChild(section);
    });
    
    // Add scroll animation
    observeMenuCards();
}

/**
 * Get emoji for category
 */
function getCategoryEmoji(category) {
    const emojis = {
        'Pizza': '🍕',
        'Burgers': '🍔',
        'Sandwiches': '🥪',
        'Drinks': '🥤',
        'Indian': '🍛',
        'Mexican': '🌮',
        'Chinese': '🍜'
    };
    return emojis[category] || '🍴';
}

/**
 * Add item to cart
 */
function addToCart(itemId) {
    // Check if user is logged in
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // User is not logged in - show alert and redirect
        alert('Please login to add items to cart!');
        window.location.href = 'login.html';
        return;
    }
    
    const item = allMenuItems.find(i => i.id === itemId);
    
    if (!item) {
        alert('Item not found!');
        return;
    }
    
    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Check if item already exists in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
            quantity: 1,
            restaurant: item.restaurant
        });
    }
    
    // Save cart back to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount();
    
    // Show success animation
    showAddToCartAnimation(itemId);
    
    // Show success message
    setTimeout(() => {
        alert(`${item.name} added to cart!`);
    }, 300);
}

/**
 * Show add to cart animation
 */
function showAddToCartAnimation(itemId) {
    const button = event.target.closest('.btn-add-cart');
    if (button) {
        button.classList.add('added');
        button.innerHTML = '<span>✓</span> Added';
        
        setTimeout(() => {
            button.classList.remove('added');
            button.innerHTML = '<span class="cart-icon">🛒</span> Add';
        }, 2000);
    }
}

/**
 * Observe menu cards for scroll animation
 */
function observeMenuCards() {
    const cards = document.querySelectorAll('.animate-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => observer.observe(card));
}

// Load menu when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayMenu();
});

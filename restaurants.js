// restaurants.js - Handles restaurant display and filtering

/**
 * Restaurant data
 * In a real application, this would come from a database
 */
const restaurants = [
    {
        id: 1,
        name: "Pizza Paradise",
        cuisine: "italian",
        rating: 4.8,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
        description: "Authentic Italian pizzas with fresh ingredients",
        specialties: "Pizza, Pasta, Italian",
        minOrder: 150
    },
    {
        id: 2,
        name: "Burger King's",
        cuisine: "american",
        rating: 4.6,
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop",
        description: "Juicy burgers and crispy fries",
        specialties: "Burgers, Fries, Shakes",
        minOrder: 100
    },
    {
        id: 3,
        name: "Spice Garden",
        cuisine: "indian",
        rating: 4.7,
        deliveryTime: "30-35 min",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
        description: "Traditional Indian cuisine with authentic flavors",
        specialties: "Curry, Biryani, Tandoor",
        minOrder: 200
    },
    {
        id: 4,
        name: "Taco Fiesta",
        cuisine: "mexican",
        rating: 4.5,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
        description: "Authentic Mexican tacos and burritos",
        specialties: "Tacos, Burritos, Nachos",
        minOrder: 120
    },
    {
        id: 5,
        name: "Dragon Wok",
        cuisine: "chinese",
        rating: 4.4,
        deliveryTime: "30-35 min",
        image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?w=400&h=300&fit=crop",
        description: "Delicious Chinese food with bold flavors",
        specialties: "Noodles, Fried Rice, Manchurian",
        minOrder: 180
    },
    {
        id: 6,
        name: "Pasta House",
        cuisine: "italian",
        rating: 4.6,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
        description: "Fresh pasta made daily with love",
        specialties: "Pasta, Lasagna, Risotto",
        minOrder: 160
    },
    {
        id: 7,
        name: "Sandwich Corner",
        cuisine: "american",
        rating: 4.3,
        deliveryTime: "15-20 min",
        image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=400&h=300&fit=crop",
        description: "Quick bites and healthy sandwiches",
        specialties: "Sandwiches, Wraps, Salads",
        minOrder: 80
    },
    {
        id: 8,
        name: "Curry Express",
        cuisine: "indian",
        rating: 4.5,
        deliveryTime: "25-30 min",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop",
        description: "Fast and flavorful Indian meals",
        specialties: "Thali, Curry, Roti",
        minOrder: 140
    },
    {
        id: 9,
        name: "Noodle Bar",
        cuisine: "chinese",
        rating: 4.7,
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
        description: "Authentic Asian noodles and soups",
        specialties: "Ramen, Noodles, Dumplings",
        minOrder: 130
    },
    {
        id: 10,
        name: "BBQ Nation",
        cuisine: "american",
        rating: 4.8,
        deliveryTime: "35-40 min",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=300&fit=crop",
        description: "Smoky BBQ and grilled delights",
        specialties: "BBQ, Grills, Steaks",
        minOrder: 250
    },
    {
        id: 11,
        name: "Taco Bell Express",
        cuisine: "mexican",
        rating: 4.4,
        deliveryTime: "20-25 min",
        image: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=300&fit=crop",
        description: "Quick Mexican food on the go",
        specialties: "Tacos, Quesadillas, Wraps",
        minOrder: 100
    },
    {
        id: 12,
        name: "The Pizza Co.",
        cuisine: "italian",
        rating: 4.9,
        deliveryTime: "30-35 min",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
        description: "Premium pizzas with gourmet toppings",
        specialties: "Gourmet Pizza, Calzone",
        minOrder: 200
    }
];

// Store all restaurants for filtering
let allRestaurants = [...restaurants];

/**
 * Display restaurants on the page
 */
function displayRestaurants(restaurantsToDisplay) {
    const container = document.getElementById('restaurantsList');
    if (!container) return;
    
    // Clear existing content
    container.innerHTML = '';
    
    // Check if no restaurants found
    if (restaurantsToDisplay.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4>No restaurants found</h4>
                <p class="text-muted">Try adjusting your filters</p>
            </div>
        `;
        return;
    }
    
    // Loop through restaurants and create cards
    restaurantsToDisplay.forEach(restaurant => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        // Generate star rating
        const stars = '⭐'.repeat(Math.floor(restaurant.rating));
        
        col.innerHTML = `
            <div class="card restaurant-card">
                <img src="${restaurant.image}" class="card-img-top" alt="${restaurant.name}">
                <div class="restaurant-badge">${restaurant.deliveryTime}</div>
                <div class="card-body">
                    <h5 class="card-title">${restaurant.name}</h5>
                    <div class="restaurant-rating mb-2">
                        <span class="rating-stars">${stars}</span>
                        <span class="rating-number">${restaurant.rating}</span>
                    </div>
                    <p class="card-text text-muted">${restaurant.description}</p>
                    <p class="restaurant-specialties"><strong>Specialties:</strong> ${restaurant.specialties}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted">Min: ₹${restaurant.minOrder}</span>
                        <a href="menu.html?restaurant=${restaurant.id}" class="btn btn-danger btn-sm">View Menu</a>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(col);
    });
}

/**
 * Filter restaurants based on search and filters
 */
function filterRestaurants() {
    const searchTerm = document.getElementById('searchRestaurant').value.toLowerCase();
    const cuisineFilter = document.getElementById('filterCuisine').value;
    const ratingFilter = parseFloat(document.getElementById('filterRating').value);
    
    let filtered = allRestaurants;
    
    // Filter by search term
    if (searchTerm) {
        filtered = filtered.filter(restaurant => 
            restaurant.name.toLowerCase().includes(searchTerm) ||
            restaurant.description.toLowerCase().includes(searchTerm) ||
            restaurant.specialties.toLowerCase().includes(searchTerm)
        );
    }
    
    // Filter by cuisine
    if (cuisineFilter !== 'all') {
        filtered = filtered.filter(restaurant => restaurant.cuisine === cuisineFilter);
    }
    
    // Filter by rating
    if (!isNaN(ratingFilter)) {
        filtered = filtered.filter(restaurant => restaurant.rating >= ratingFilter);
    }
    
    // Display filtered restaurants
    displayRestaurants(filtered);
}

// Load restaurants when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayRestaurants(allRestaurants);
});

// auth.js - Handles login and registration functionality

/**
 * Show login form and hide register form
 */
function showLoginForm() {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registerForm').style.display = 'none';
}

/**
 * Show register form and hide login form
 */
function showRegisterForm() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

/**
 * Validate email format using regex
 */
function validateEmail(email) {
    // Email regex pattern
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Handle user registration
 */
function handleRegister(event) {
    // Prevent form from submitting normally
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const phone = document.getElementById('registerPhone').value.trim();
    
    // Validate email format
    if (!validateEmail(email)) {
        alert('Please enter a valid email address!\nExample: user@example.com');
        return;
    }
    
    // Validate phone number (10 digits)
    if (phone.length !== 10 || isNaN(phone)) {
        alert('Please enter a valid 10-digit phone number!');
        return;
    }
    
    // Validate password length
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Get existing users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if email already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        alert('Email already registered! Please login.');
        showLoginForm();
        return;
    }
    
    // Create new user object
    const newUser = {
        name: name,
        email: email,
        password: password, // In real app, password should be hashed
        phone: phone,
        registeredDate: new Date().toLocaleString(),
        joinedDate: new Date().toISOString()
    };
    
    // Add user to users array
    users.push(newUser);
    
    // Save users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    // Show success message
    alert('Registration successful! Please login.');
    
    // Clear form
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
    document.getElementById('registerPhone').value = '';
    
    // Show login form
    showLoginForm();
}

/**
 * Handle user login
 */
function handleLogin(event) {
    // Prevent form from submitting normally
    event.preventDefault();
    
    // Get form values
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    // Validate email format
    if (!validateEmail(email)) {
        alert('Please enter a valid email address!\nExample: user@example.com');
        return;
    }
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Find user with matching email and password
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        // Save current user to sessionStorage (session ends when browser closes)
        sessionStorage.setItem('currentUser', JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone
        }));
        
        // Show success message
        alert(`Welcome back, ${user.name}!`);
        
        // Redirect to home page
        window.location.href = 'index.html';
    } else {
        // Login failed
        alert('Invalid email or password!');
    }
}

// Check if user is already logged in when page loads
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
        // User is already logged in, redirect to home
        alert('You are already logged in!');
        window.location.href = 'index.html';
    }
});

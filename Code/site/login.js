import {updateUI } from './index.js';
document.addEventListener('DOMContentLoaded', () => {
    // Login function
    async function login() {
        // Get the input values
        const email = document.getElementById('email1').value.trim();
        const password = document.getElementById('password1').value.trim();

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        // Validate password
        if (password.length < 8 || password.length > 15) {
            alert("Password must be between 8 and 15 characters long.");
            return;
        }

        // Create user object
        const user = {
            user_email: email,
            user_password: password
        };

        // Send POST request to the server
        fetch('/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                alert("Login successful!");
                window.location.href = "/index.html";
                localStorage.setItem('userId', user.user_id);
                updateUI(); // Update the UI after login

            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred during login.");
        });
    }

    // Attach the login function to the button click event
    const loginButton = document.querySelector('login-btn');
    if (loginButton) {
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            login();
        });
    } else {
        console.error("Login button not found.");
    }
});

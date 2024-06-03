document.addEventListener('DOMContentLoaded', () => {
    // Sign up function
    async function signUp() {
        // Get the input values
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        // Validate username

        if (username.length < 8) {
            alert("Username must be at least 8 characters long.");
            return;
        }

        // Validate password
        const specialCharRegex = /[^a-zA-Z0-9.!]/;
        if (specialCharRegex.test(password)) {
            alert("Password can only contain letters, numbers, dots, and exclamation marks.");
            return;
        }

        // Create user object
        const user = {
            user_name: username,
            user_email: email,
            user_password: password
        };

        // Send POST request to the server
        fetch('/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if (data._id) {
                alert("User created successfully!");
                window.location.href = "/login.html";
                // Redirect or perform any other actions upon success
            } else {
                alert("Error: " + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("An error occurred during signup.");
        });
    }

    // Attach the signUp function to the button click event
    const signInButton = document.querySelector('.signup-btn');
    if (signInButton) {
        signInButton.addEventListener('click', (event) => {
            event.preventDefault();
            signUp();
        });
    } else {
        console.error("Sign-up button not found.");
    }
});

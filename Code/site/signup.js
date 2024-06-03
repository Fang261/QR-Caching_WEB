function signUp() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    var data = { username: username, email: email, password: password };

    fetch('http://localhost:3000/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            return response.json().then(errorData => {
                throw new Error(errorData.message);
            });
        }
    })
    .then(result => {
        alert('Sign up successful!');
        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Sign up failed: ' + error.message);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.signin-btn').addEventListener('click', function(event) {
        event.preventDefault();
        signUp();
    });
});

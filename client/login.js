document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to login');
            }
        })
        .then(data => {
            if (data.user) {
                // Redirect to index.html upon successful login
                window.location.href = 'index.html';
            } else {
                alert('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error logging in');
        });
    });
});

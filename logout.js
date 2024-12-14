document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            fetch('/logout', {
                method: 'POST',
                credentials: 'include' // Include cookies (sessions) in the request
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'index.html'; // Redirect to index.html page on logout
                } else {
                    console.error('Logout failed.');
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
        });
    }
});

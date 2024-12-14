document.addEventListener('DOMContentLoaded', () => {
    // Select elements
    const loginForm = document.getElementById('loginFormElement');
    const signupForm = document.getElementById('signupFormElement');
    const loginErrorMessage = document.getElementById('loginErrorMessage');
    const signupErrorMessage = document.getElementById('signupErrorMessage');
    const showSignupLink = document.getElementById('showSignup');
    const showLoginLink = document.getElementById('showLogin');
    const loginFormContainer = document.getElementById('loginForm');
    const signupFormContainer = document.getElementById('signupForm');
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');

    // Verify required elements
    if (!loginForm || !signupForm || !loginErrorMessage || !signupErrorMessage || !showSignupLink || !showLoginLink || !loginFormContainer || !signupFormContainer) {
        console.error('One or more required elements are missing!');
        return;
    }

    // Create and append popup if needed
    let popup = document.createElement('div');
    popup.id = 'popup';
    popup.className = 'hidden';
    popup.style.position = 'fixed';
    popup.style.bottom = '20px';
    popup.style.right = '20px';
    popup.style.width = '300px'; // Adjust width as needed
    popup.style.height = '200px'; // Adjust height as needed
    popup.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    popup.style.color = '#fff';
    popup.style.borderRadius = '10px';
    popup.style.padding = '15px';
    popup.style.zIndex = '1001';

    let closePopupButton = document.createElement('button');
    closePopupButton.textContent = '✖'; // Cross mark
    closePopupButton.style.fontSize = '24px';
    closePopupButton.style.background = 'none';
    closePopupButton.style.border = 'none';
    closePopupButton.style.color = '#fff';
    closePopupButton.style.cursor = 'pointer';
    closePopupButton.addEventListener('click', () => popup.classList.add('hidden'));
    popup.appendChild(closePopupButton);
    document.body.appendChild(popup);

    // Show signup form
    showSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        loginFormContainer.classList.add('hidden');
        signupFormContainer.classList.remove('hidden');
    });

    // Show login form
    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        signupFormContainer.classList.add('hidden');
        loginFormContainer.classList.remove('hidden');
    });

    // Handle login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3001/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                window.location.href = 'dashboard.html'; // Redirect to dashboard on successful login
            } else {
                loginErrorMessage.textContent = result.message || 'Login failed. Please try again.';
            }
        } catch (error) {
            loginErrorMessage.textContent = 'An error occurred. Please try again.';
            console.error('Login Error:', error);
        }
    });

    // Handle signup form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;

        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, confirmPassword }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                window.location.href = 'dashboard.html'; // Redirect to dashboard on successful signup
            } else {
                signupErrorMessage.textContent = result.message || 'Signup failed. Please try again.';
            }
        } catch (error) {
            signupErrorMessage.textContent = 'An error occurred. Please try again.';
            console.error('Signup Error:', error);
        }
    });

    // Handle search bar and button
    if (searchBar && searchButton) {
        // Handle input event
        searchBar.addEventListener('input', () => {
            const query = searchBar.value;
            console.log('Search query:', searchBar.value);
            // Add logic to filter or search based on query
        });

        // Handle button click event
        searchButton.addEventListener('click', () => {
            console.log('Search button clicked with query:', searchBar.value);
            // Add logic to handle the search action
        });
    } else {
        console.error('Search bar or button element is missing!');
    }
});

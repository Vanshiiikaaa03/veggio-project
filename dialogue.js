document.addEventListener('DOMContentLoaded', () => {
    const dialogueBox = document.getElementById('dialogueBox');
    const dialogueContent = document.getElementById('dialogueContent');
    const buttons = document.querySelectorAll('.button');
    const logoutButton = document.getElementById('logoutButton');

    // Show dialogue box
    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText;

            // Clear existing content before adding new content
            dialogueContent.innerHTML = '';

            if (buttonText === 'Order Your Food') {
                dialogueContent.innerHTML = `<p>Choose your food category</p>
                    <div class="block-container">
                        <div class="block" id="appetizers">Appetizers</div>
                        <div class="block" id="mainCourses">Main Courses</div>
                        <div class="block" id="desserts">Desserts</div>
                        <div class="block" id="beverages">Beverages</div>
                        <div class="block" id="salads">Salads</div>
                        <div class="block" id="breads">Breads</div>
                    </div>`;
                
                // Add click event listeners for each block
                document.getElementById('appetizers').addEventListener('click', () => {
                    window.open('appetizers.html', '_blank'); // Opens in a new tab
                });

                document.getElementById('mainCourses').addEventListener('click', () => {
                    window.open('mainCourses.html', '_blank'); // Opens in a new tab
                });

                document.getElementById('desserts').addEventListener('click', () => {
                    window.open('desserts.html', '_blank'); // Opens in a new tab
                });

                document.getElementById('beverages').addEventListener('click', () => {
                    window.open('beverages.html', '_blank'); // Opens in a new tab
                });

                document.getElementById('salads').addEventListener('click', () => {
                    window.open('salads.html', '_blank'); // Opens in a new tab
                });

                document.getElementById('breads').addEventListener('click', () => {
                    window.open('breads.html', '_blank'); // Opens in a new tab
                });

            } else if (buttonText === 'Track Your Food') {
                dialogueContent.innerHTML = '<p>Hello</p>';
            } else if (buttonText === 'Suggestions and Ratings') {
                dialogueContent.innerHTML = '<p>Hello</p>';
            } else if (buttonText === 'Ask Your Query') {
                dialogueContent.innerHTML = '<p>Hello</p>';
            } else {
                dialogueContent.innerHTML = `<p>${buttonText} content goes here</p>`;
            }

            dialogueBox.style.display = 'block'; // Show the box without sliding effect
        });
    });

    // Close the dialogue box
    window.closeDialogue = function() {
        dialogueBox.style.display = 'none'; // Hide the box
    };

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();

            try {
                const response = await fetch('http://localhost:3001/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    // Redirect to login page or home page
                    window.location.href = 'index.html';
                } else {
                    console.error('Logout failed:', result.message);
                }
            } catch (error) {
                console.error('Logout Error:', error);
            }
        });
    }
});

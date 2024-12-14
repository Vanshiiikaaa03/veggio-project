document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3001/api/foods/Beverages');
        const foods = await response.json();

        const gridContainer = document.querySelector('.grid-container');
        let cartCount = 0; // To keep track of the number of items in the cart


        foods.forEach(food => {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gridItem.dataset.name = food.name; // Store food name for filtering
            gridItem.innerHTML = `
                <div class="food-image-container">
                    <img src="${food.imageUrl}" alt="${food.name}" class="food-image">
                </div>
                <div class="food-name">${food.name}</div>
                <div class="food-price">Rs ${food.price} /-</div>
                <div class="quantity-container">
                    <button class="decrease-btn" data-id="${food._id}">-</button>
                    <span class="quantity-display" id="quantity-${food._id}">0</span>
                    <button class="increase-btn" data-id="${food._id}">+</button>
                </div>
            `;
            gridContainer.appendChild(gridItem);
        });


        // Add event listeners for the increase and decrease buttons
        document.querySelectorAll('.increase-btn').forEach(button => {
            button.addEventListener('click', () => {
                const foodId = button.getAttribute('data-id');
                updateQuantity(foodId, 1);
            });
        });

        document.querySelectorAll('.decrease-btn').forEach(button => {
            button.addEventListener('click', () => {
                const foodId = button.getAttribute('data-id');
                updateQuantity(foodId, -1);
            });
        });

        // Event listener for search input
        document.getElementById('searchBar').addEventListener('input', (event) => {
            const searchQuery = event.target.value.toLowerCase();
            document.querySelectorAll('.grid-item').forEach(item => {
                const foodName = item.dataset.name.toLowerCase();
                if (foodName.includes(searchQuery)) {
                    item.style.display = ''; // Show item
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });

        // Function to update quantity and cart count
        function updateQuantity(foodId, change) {
            const quantityElement = document.getElementById(`quantity-${foodId}`);
            let currentQuantity = parseInt(quantityElement.textContent);
            const newQuantity = Math.max(0, currentQuantity + change); // Ensure quantity doesn't go below 0
            quantityElement.textContent = newQuantity;

            // Update cart count
            updateCartCount(change);
        }

        // Function to update cart count badge
        function updateCartCount(change) {
            cartCount = Math.max(0, cartCount + change); // Prevent cart count from going below 0
            document.querySelector('.cart-count').textContent = cartCount;

            // Show or hide popup based on cart count
            if (cartCount > 0) {
                showPopup(cartCount);
            } else {
                hidePopup();
            }
        }

        // Function to show popup
        function showPopup(totalItems) {
            const popup = document.getElementById('popup');
            const totalItemsElement = document.getElementById('total-items');
            totalItemsElement.textContent = totalItems;

            popup.classList.remove('hidden');
            popup.classList.add('visible');
        }

        // Function to hide popup
        function hidePopup() {
            const popup = document.getElementById('popup');
            popup.classList.remove('visible');
            popup.classList.add('hidden');
        }

        // Add event listener for "Go to Cart" button
        const goToCartButton = document.getElementById('go-to-cart');
        if (goToCartButton) {
            goToCartButton.addEventListener('click', () => {
                window.location.href = 'cart.html'; // Redirect to cart page
            });
        }

    } catch (error) {
        console.error('Error fetching food data:', error);
    }
});
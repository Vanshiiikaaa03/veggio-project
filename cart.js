document.querySelectorAll('.grid-item').forEach(item => {
    let quantity = 1;

    // Get the elements inside the block
    const decreaseButton = item.querySelector('.decrease');
    const increaseButton = item.querySelector('.increase');
    const quantityDisplay = item.querySelector('.quantity');
    const addToCartButton = item.querySelector('.add-to-cart');
    const cartCountElement = document.querySelector('.cart-count');
    
    // Handle increase button click
    increaseButton.addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
    });

    // Handle decrease button click
    decreaseButton.addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantityDisplay.textContent = quantity;
        }
    });

    // Handle Add to Cart button click
    addToCartButton.addEventListener('click', () => {
        // Get the current number in the cart
        let cartCount = parseInt(cartCountElement.textContent) || 0;

        // Add the current quantity to the cart
        cartCount += quantity;

        // Update the cart icon with the new cart count
        cartCountElement.textContent = cartCount;

        // Reset quantity to 1 after adding to cart
        quantity = 1;
        quantityDisplay.textContent = quantity;
    });
});

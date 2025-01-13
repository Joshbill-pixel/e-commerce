document.addEventListener('DOMContentLoaded', () => {
    const cartTable = document.querySelector('.cart-table');

    // Get cart data from LocalStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Populate the cart table with cart items
    cart.forEach(item => {
        const cartRow = document.createElement('div');
        cartRow.classList.add('cart-row');

        const unitPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, '')); // Parse price
        // <div class="product-image" style="background-image: ${item.image};"></div>
        cartRow.innerHTML = `
            <div class="cart-column cart-product">
                <div class="product-info">
                    <p class="product-name">${item.title}</p>
                </div>
            </div>
            <div class="cart-column">${item.price}</div>
            <div class="cart-column">
                <input type="number" class="quantity-input" value="${item.quantity}" min="1">
            </div>
            <div class="cart-column">₦${(item.quantity * unitPrice).toFixed(2)}</div>
            <div class="cart-column">
                <button class="btn remove-btn">Remove</button>
            </div>
        `;

        // Append the row to the cart table
        cartTable.appendChild(cartRow);

        // Add event listeners for Remove button and Quantity change
        cartRow.querySelector('.remove-btn').addEventListener('click', () => {
            removeCartItem(item.title);
            cartRow.remove();
        });

        cartRow.querySelector('.quantity-input').addEventListener('input', (event) => {
            const quantity = parseInt(event.target.value);
            item.quantity = quantity; // Update quantity in LocalStorage
            localStorage.setItem('cart', JSON.stringify(cart));
            const subtotalColumn = cartRow.querySelector('.cart-column:nth-child(4)');
            subtotalColumn.textContent = `₦${(quantity * unitPrice).toFixed(2)}`;
            updateCartSummary();
        });
    });

    updateCartSummary(); // Update cart summary on load
});

// Function to remove a product from the cart
function removeCartItem(title) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.title !== title);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}

// Function to update the cart summary
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;

    cart.forEach(item => {
        const unitPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
        subtotal += unitPrice * item.quantity;
    });

    // const tax = subtotal * 0.1; // Assuming a 10% tax rate
    // const total = subtotal + tax;
    // <p><strong>Tax (10%):</strong> ₦${tax.toFixed(2)}</p>
    // <p><strong>Total:</strong> ₦${total.toFixed(2)}</p>

    document.querySelector('.cart-summary').innerHTML = `
        <h2>Cart Summary</h2>
        <p><strong>Subtotal:</strong> ₦${subtotal.toFixed(2)}</p>
        <button class="btn checkout-btn">
            <a href="checkout.html">
                Proceed to Checkout
            </a> 
        </button>
    `;
}

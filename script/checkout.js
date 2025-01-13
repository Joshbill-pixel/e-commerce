document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cart-items-list");
    const totalPriceElement = document.getElementById("total-price");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
        totalPriceElement.textContent = "0.00";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item) => {
        const price = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        const quantity = parseInt(item.quantity, 10);
        const itemSubtotal = price * quantity;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${item.title} (x${quantity})</span>
            <span>₦${itemSubtotal.toFixed(2)}</span>
        `;
        cartItemsList.appendChild(listItem);

        totalPrice += itemSubtotal;
    });

    // Display total price and store in localStorage
    totalPriceElement.textContent = totalPrice.toFixed(2);
    localStorage.setItem("totalPrice", totalPrice.toFixed(2));
});

document.addEventListener("DOMContentLoaded", () => {
    const billingForm = document.getElementById("billing-form");

    billingForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Iterate over all inputs and check validity
        const inputs = billingForm.querySelectorAll("input, textarea");
        const error = document.getElementById("error");
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                // Add red border for invalid inputs
                input.style.border = "2px solid red";
                isValid = false;

                error.innerHTML = `Please fill out all inputs!`
            } else {
                // Remove red border for valid inputs
                input.style.border = "1px solid #ccc"; // Reset to default or desired border style
            }
        });

        // If the form is valid, proceed
        if (isValid) {
            const billingInfo = {
                name: document.getElementById("name").value.trim(),
                email: document.getElementById("email").value.trim(),
                address: document.getElementById("address").value.trim(),
                phone: document.getElementById("phone").value.trim(),
            };

            // Save billing info to localStorage
            localStorage.setItem("billingInfo", JSON.stringify(billingInfo));

            // Redirect to payment page
            window.location.href = "payment.html";
        } else {
            console.log("Please fill in all required fields.");
        }
    });
});
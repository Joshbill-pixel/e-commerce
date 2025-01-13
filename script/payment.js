document.addEventListener("DOMContentLoaded", () => {
    const cartItemsList = document.getElementById("cart-items-list");
    const totalPriceElement = document.getElementById("total-price");
    const billingName = document.getElementById("billing-name");
    const billingEmail = document.getElementById("billing-email");
    const billingAddress = document.getElementById("billing-address");
    const billingPhone = document.getElementById("billing-phone");

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const billingInfo = JSON.parse(localStorage.getItem("billingInfo")) || {};
    const totalPrice = localStorage.getItem("totalPrice");

    if (!totalPrice) {
        console.error("Total price not found in localStorage.");
        totalPriceElement.textContent = "0.00";
    } else {
        totalPriceElement.textContent = totalPrice;
    }

    if (cart.length === 0) {
        cartItemsList.innerHTML = "<li>Your cart is empty.</li>";
    } else {
        cartItemsList.innerHTML = ""; // Clear any previous content
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
        });
    }

    // Populate billing information
    billingName.textContent = billingInfo.name || "N/A";
    billingEmail.textContent = billingInfo.email || "N/A";
    billingAddress.textContent = billingInfo.address || "N/A";
    billingPhone.textContent = billingInfo.phone || "N/A";
});

document.addEventListener("DOMContentLoaded", () => {
    const creditCardForm = document.getElementById("credit-card-form");
    const successMessage = document.getElementById("success");

    creditCardForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form submission

        let isValid = true;
        let errorMessage = "";

        // Select inputs
        const cardNumberInput = document.getElementById("card-number");
        const expiryDateInput = document.getElementById("expiry-date");
        const cvvInput = document.getElementById("cvv");

        // Reset styles and messages
        const inputs = creditCardForm.querySelectorAll("input");
        inputs.forEach((input) => {
            input.style.border = "1px solid #ccc"; // Reset to default border style
        });
        successMessage.textContent = ""; // Clear previous messages

        // Check for empty fields
        inputs.forEach((input) => {
            if (!input.value.trim()) {
                input.style.border = "2px solid red";
                isValid = false;
            }
        });

        if (!isValid) {
            successMessage.textContent = "Please fill out all input fields!";
            successMessage.style.color = "red";
            return; // Stop further validation if fields are empty
        }

        // Validate Card Number
        const cardNumber = cardNumberInput.value.trim();
        if (!/^\d{16}$/.test(cardNumber)) {
            cardNumberInput.style.border = "2px solid red";
            errorMessage += "Card number must be exactly 16 digits.\n";
            isValid = false;
        }

        // Validate CVV
        const cvv = cvvInput.value.trim();
        if (!/^\d{3}$/.test(cvv)) {
            cvvInput.style.border = "2px solid red";
            errorMessage += "CVV must be exactly 3 digits.\n";
            isValid = false;
        }

        // Validate Expiry Date
        if (!expiryDateInput.value.trim()) {
            expiryDateInput.style.border = "2px solid red";
            errorMessage += "Expiry date is required.\n";
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            successMessage.textContent = "Payment confirmed! Thank you.";
            successMessage.style.color = "green";

            // Optionally save the payment details or perform other actions
            const paymentInfo = {
                cardNumber: cardNumber,
                expiryDate: expiryDateInput.value,
                cvv: cvv,
            };

            console.log("Payment Info:", paymentInfo);

            // Reset the form after successful submission
            creditCardForm.reset();
        } else {
            successMessage.textContent = errorMessage.trim();
            successMessage.style.color = "red";
        }
    });
});

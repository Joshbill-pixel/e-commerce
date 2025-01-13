// Toggle the navigation menu on mobile
const hamburger = document.querySelector('.hamburger');
const navbarLinks = document.querySelector('.navbar-links');
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector(".carousel-control.prev");
const nextButton = document.querySelector(".carousel-control.next");

hamburger.addEventListener('click', (e) => {
    e.preventDefault();
    navbarLinks.classList.toggle('active');
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';
    navbarLinks.style.transition = 'transform 0.5s ease-in-out';
});

// IMAGE CAROUSEL
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".carousel-image");
    const indicators = document.querySelectorAll(".indicator");
    const prevButton = document.querySelector(".carousel-control.prev");
    const nextButton = document.querySelector(".carousel-control.next");
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle("active", i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle("active", i === index);
        });
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    // Auto-play functionality
    let autoplay = setInterval(nextImage, 5000); // Change image every 5 seconds

    // Event listeners
    nextButton.addEventListener("click", () => {
        clearInterval(autoplay);
        nextImage();
    });

    prevButton.addEventListener("click", () => {
        clearInterval(autoplay);
        prevImage();
    });

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            clearInterval(autoplay);
            currentIndex = index;
            showImage(index);
        });
    });
});

// ADD TO CART
document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const cartBadge = document.querySelector(".badge");

    let cartCount = JSON.parse(localStorage.getItem('cart'))?.length || 0; // Initialize cart count
    cartBadge.textContent = cartCount;

    addToCartButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productCard = button.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productPrice = productCard.querySelector('.product-price').textContent;

            addToCart(productTitle, productPrice);
            cartCount++;
            cartBadge.textContent = cartCount;
        });
    });
});
/// Add to Cart Function
function addToCart(title, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.title === title);

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ title, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}



// ADD TO WISHLIST
document.addEventListener("DOMContentLoaded", () => {
    const wishlistButtons = document.querySelectorAll(".add-to-wishlist");
    const wishlistBadge = document.querySelector(".wishlist-badge");

    let wishlistCount = 0; // Initial wishlist count

    wishlistButtons.forEach((button) => {
        button.addEventListener("click", () => {
            wishlistCount++; // Increment the wishlist count
            wishlistBadge.textContent = wishlistCount; // Update the badge text
        });
    });
});

// SCROLL TO TOP BUTTON
// document.addEventListener("DOMContentLoaded", () => {
//     const scrollToTopButton = document.querySelector(".scroll-to-top");

//     function scrollToTop() {
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     }

//     scrollToTopButton.addEventListener("click", scrollToTop);
// });

// SEARCH FUNCTIONALITY
function closeSearchDisplay() {
    const searchDisplay = document.getElementById("search-display");
    searchDisplay.style.display = "none";
}

// FAQ 
document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;

        // Close all other FAQ items (optional behavior)
        document.querySelectorAll('.faq-item').forEach((item) => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });

        // Toggle current FAQ item
        faqItem.classList.toggle('active');
    });
});



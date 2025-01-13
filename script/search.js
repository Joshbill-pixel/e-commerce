document.addEventListener("DOMContentLoaded", () => {
    const searchIcon = document.getElementById("search-icon");
    const searchDisplay = document.getElementById("search-display");

    searchIcon.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("Search icon clicked!");
        if (searchDisplay.style.display === "flex") {
            searchDisplay.style.display = "none";


        } else {
            searchDisplay.style.display = "flex";
        }
    });
});

// IFRAME FUNCTIONALLITY
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();

    const contentContainer = document.getElementById("content-container");
    const url = "web/card1.html"; // Path to the external HTML file

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.text();
        })
        .then((html) => {
            // Inject the HTML into the container
            contentContainer.innerHTML = html;

            // Initialize carousel functionality
            initializeCarousel();
        })
        .catch((error) => {
            console.error("Error loading the content:", error);
            contentContainer.innerHTML = "<p>Error loading content. Please try again later.</p>";
        });
});

document.getElementById("load-content-form1").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const contentContainer = document.getElementById("content-container");
    const url = "web/card1.html"; // Path to the external HTML file

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.text();
        })
        .then((html) => {
            // Inject the HTML into the container
            contentContainer.innerHTML = html;

            // Initialize carousel functionality
            initializeCarousel();
        })
        .catch((error) => {
            console.error("Error loading the content:", error);
            contentContainer.innerHTML = "<p>Error loading content. Please try again later.</p>";
        });
});

document.getElementById("load-content-form2").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const contentContainer = document.getElementById("content-container");
    const url = "web/card2.html"; // Path to the external HTML file

    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }
            return response.text();
        })
        .then((html) => {
            // Inject the HTML into the container
            contentContainer.innerHTML = html;

            // Initialize carousel functionality
            initializeCarousel();
        })
        .catch((error) => {
            console.error("Error loading the content:", error);
            contentContainer.innerHTML = "<p>Error loading content. Please try again later.</p>";
        });
});

function initializeCarousel() {
    const carouselContainer = document.querySelector(".carousel-container");
    const prevButton = document.querySelector(".carousel-control.backward");
    const nextButton = document.querySelector(".carousel-control.forward");
    const items = document.querySelectorAll(".carousel-item");
    let currentIndex = 0;
    const totalItems = items.length;
    const itemWidth = items[0].offsetWidth;
    
    function updateCarousel() {
        carouselContainer.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    }

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    // Initialize carousel by displaying the first item
    updateCarousel();
}

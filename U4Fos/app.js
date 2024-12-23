// the Unlash API is not working anymore, so I have used the JSON file to load the menu items 
//same as the url : https://surjeet-food-ordering-system.netlify.app/?

// Source :
// https://www.reddit.com/r/unsplash/comments/s13x4h/what_happened_to_sourceunsplashcom/
// 
// We do want to let you know that source.unsplash.com was created before the Unsplash API. 
// Unfortunately, Unsplash no longer provides any support for source.unsplash.com. 
// We only left up this option for legacy developers who had been using source.unsplash.com before the Unsplash API was created. 
// If you plan to use Unsplash images, it can only be through the Unsplash API since that is all we support at this time. 
// You can find more information about the Unsplash API here:

document.addEventListener("DOMContentLoaded", function () {
    // Hamburger menu logic
    let open = document.querySelector(".open");
    let close = document.querySelector(".close");
    let side_bar = document.querySelector(".side-bar");

    open.addEventListener("click", function () {
        close.style.display = "block";
        side_bar.style.display = "flex";
    });

    close.addEventListener("click", function () {
        close.style.display = "none";
        side_bar.style.display = "none";
    });

    // The API URL for the menu
    const MENU_API_URL = "https://raw.githubusercontent.com/saksham-accio/f2_contest_3/main/food.json";
    // const MENU_API_URL = "https://raw.githubusercontent.com/DragonUncaged/Basic-Projects/refs/heads/main/U4Fos/food.json";
    const IMAGE_TIMEOUT = 1000; // Timeout for image loading (1 second)
    const FALLBACK_IMAGE = 'img/default-loading.png'; // Fallback image in case of failure

    // Helper function to load an image with a timeout
    function loadImageWithTimeout(imgSrc, timeout) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            const timeoutId = setTimeout(() => {
                img.src = '';
                reject(new Error('Image load timeout'));
            }, timeout);

            img.onload = () => {
                clearTimeout(timeoutId);
                resolve(imgSrc);
            };

            img.onerror = () => {
                clearTimeout(timeoutId);
                reject(new Error('Image load failed'));
            };

            img.src = imgSrc;
        });
    }

    // Function to load and display menu items
    async function getMenu() {
        const cardSection = document.querySelector(".card-section");

        try {
            const response = await fetch(MENU_API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();

            // Process each menu item and handle image loading
            const menuItemsPromises = data.map(async (item) => {
                try {
                    // Try to load the image with timeout
                    // console.log(item.imgSrc);
                    const imageUrl = await loadImageWithTimeout(item.imgSrc, IMAGE_TIMEOUT);
                    return createMenuItemHTML(item, imageUrl);
                } catch (imageError) {
                    console.warn(`Failed to load image for ${item.name}:`, imageError);
                    // Use fallback image if original fails to load
                    return createMenuItemHTML(item, FALLBACK_IMAGE);
                }
            });

            // Wait for all menu items to be processed
            const menuItemsHTML = await Promise.all(menuItemsPromises);
            cardSection.innerHTML = menuItemsHTML.join('');
            return data;

        } catch (error) {
            console.error('Error loading menu:', error);
            cardSection.innerHTML = '<p class="error">Failed to load menu. Please try again later.</p>';
            throw error;
        }
    }

    // Helper function to create HTML for each menu item
    function createMenuItemHTML(item, imageUrl) {
        return `
            <div class="card">
                <div class="img-container">
                    <img src="${imageUrl}" 
                         alt="${item.name}" 
                         class="card-main-img"
                         onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';">
                </div>
                <div class="card-content">
                    <div class="card-start-content">
                        <p class="food-name">${item.name}</p>
                        <p class="cost">$${item.price}/-</p>
                    </div>
                    <div class="card-end-content">
                        <img src="img/Group 4.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
    }

    // Calling getMenu to load data when DOM is ready
    getMenu();

    // Function to simulate taking the order
    function takeOrder() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const burgers = [
                    { name: "Cheese Burger", price: 5.99 },
                    { name: "Veggie Burger", price: 6.49 },
                    { name: "Bacon Burger", price: 7.49 },
                    { name: "Chicken Burger", price: 6.99 },
                    { name: "Mushroom Burger", price: 6.79 },
                    { name: "Double Cheese Burger", price: 8.99 },
                    { name: "BBQ Burger", price: 7.99 },
                    { name: "Fish Burger", price: 7.29 },
                    { name: "Turkey Burger", price: 6.49 },
                    { name: "Spicy Burger", price: 7.49 },
                ];

                const randomBurgers = [];
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(Math.random() * burgers.length);
                    randomBurgers.push(burgers[randomIndex]);
                }

                resolve(randomBurgers);
            }, 2500);
        });
    }

    // Function to simulate order preparation
    function orderPrep() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let orderPrepObj = { order_status: true, paid: false };
                resolve(orderPrepObj);
            }, 1500);
        });
    }

    // Function to simulate payment process
    function payOrder() {
        return new Promise((resolve) => {
            setTimeout(() => {
                let payOrderObj = { order_status: true, paid: true };
                resolve(payOrderObj);
            }, 1000);
        });
    }

    // Function to thank the user after payment
    function thankyou() {
        alert("Thank you for eating with us today!");
    }

    // Main function to control the flow of all the functions
    function main() {
        takeOrder()
            .then((order) => {
                console.log("Your Order:", order);
                return orderPrep(); // Return the promise
            })
            .then((orderStatus) => {
                console.log("Order Preparation Status:", orderStatus);
                return payOrder(); // Return the promise
            })
            .then((payOrderStatus) => {
                console.log("Payment Status:", payOrderStatus);
                if (payOrderStatus && payOrderStatus.paid) {
                    thankyou();
                }
            });
    }

    main();

});

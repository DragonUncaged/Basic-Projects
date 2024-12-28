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
    const MENU_API_URL = "https://raw.githubusercontent.com/DragonUncaged/Basic-Projects/refs/heads/main/U4Fos/food.json";
    const IMAGE_TIMEOUT = 1500; // Timeout for image loading (1.5 second)
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
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="card">
                <div class="img-container">
                    <img
                        src="${imageUrl}"
                        alt="${item.name}"
                        class="card-main-img"
                        onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
                    />
                </div>
                <div class="card-content">
                    <div class="card-start-content">
                        <p class="food-name">${item.name}</p>
                        <p class="cost">$${item.price}/-</p>
                    </div>
                    <!-- Inline click handler -->
                    <div class="card-end-content" onclick="triggerOrder('${item.name}', ${item.price})">
                        <img src="img/Group 4.png" alt="add to cart">
                    </div>
                </div>
            </div>
        `;
        return template.innerHTML;

    }
    // Global function called by the inline onclick
    window.triggerOrder = function(name, price) {
        const order = { name, price };
        console.log('Order triggered:', order); 
        takeOrder1(order)
            .then(orderPrep1)
            .then(payOrder1)
            .then(thankyou1)
            .catch(err => console.error(err));
    };

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

    //----------------------------------------------------------------------------------
    function takeOrder1(order) {
        return new Promise((resolve, reject) => {
            console.log('Order taken:', order);
            // Simulate order processing delay
            setTimeout(() => {
                resolve(order);
            }, 1000);
        });
    }
    
    function orderPrep1(order) {
        return new Promise((resolve, reject) => {
            console.log('Order prepared:', order);
            // Simulate order preparation delay
            setTimeout(() => {
                let orderPrepObj = { order_status: true, paid: false };
                console.log('Order Preparation Status:', orderPrepObj);
                resolve(order);
            }, 2000);
        });
    }
    
    function payOrder1(order) {
        return new Promise((resolve, reject) => {
            console.log('Order paid:', order);
            // Simulate payment processing delay
            setTimeout(() => {
                let payOrderObj = { order_status: true, paid: true };
                console.log('Payment Status:', payOrderObj);
                resolve(order);
            }, 1500);
        });
    }
    
    function thankyou1(order) {
        return new Promise((resolve, reject) => {
            console.log('Thank you for your order:', order);
            alert("Thank you for eating with us today!");
            // Simulate thank you message delay
            setTimeout(() => {
                resolve(order);
            }, 500);
        });
    }
    //----------------------------------------------------------------------------------

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

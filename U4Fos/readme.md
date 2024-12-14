# Food Menu App

This is a simple food menu app where users can view a variety of menu items, with images, prices, and descriptions. The app also simulates a food ordering and payment process, making it an interactive and engaging experience.

## Features

- **Dynamic Menu**: The app fetches menu data from a remote JSON file and displays it in a responsive grid layout.
- **Image Loading with Timeout**: The app ensures that images for menu items are loaded within a specific time frame, falling back to a default image if the original image fails to load.
- **Hamburger Menu**: A mobile-friendly sidebar is used to navigate through the app.
- **Interactive Ordering**: Users can simulate ordering food, processing payment, and receiving a "Thank you" message after the transaction is completed.

## Technologies Used

- **HTML5**
- **CSS3** (with Flexbox)
- **JavaScript** (ES6+)
- **Fetch API** (to load menu data from an external JSON file)
- **Promises** (for simulating order preparation and payment)

## Installation

To run this app locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/U4Fos.git
   ```

## How It Works
- Each menu item is displayed with its image, name, and price.
- When the page loads, the app fetches the menu items from a JSON file hosted on GitHub.
- Users can click on the hamburger menu icon to open/close the sidebar.
- The app simulates the process of taking an order, preparing the food, and making the payment.
- If an image fails to load within 2 seconds, the app displays a fallback image.

## Code Structure
- index.html: The main HTML file containing the structure of the app.
- style.css: The CSS file that styles the app layout and components.
- script.js: The JavaScript file that contains the logic for loading menu data, simulating ordering and payment, and handling image loading timeouts.

## Folder Structure
```graphql
food-menu-app/
│
├── index.html       # The main HTML file
├── style.css        # Styles for the app
├── script.js        # JavaScript file for app functionality
├── img/             # Folder for images
│   └── default-loading.png  # Default fallback image
└── README.md        # Project documentation
```



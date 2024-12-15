# Shopping Cart Application

A fully functional shopping cart application built with HTML, CSS, and JavaScript. It includes features like user authentication, product fetching from an API, filtering, shopping cart management, checkout functionality, and user profile management.

## Project Features

### 1. **User Authentication**
   - **Signup & Login**: Users can sign up and log in using forms.
   - **Token-based Authentication**: Token is generated for logged-in users, restricting unauthorized access.
   - **Profile Management**: Users can view and edit their profile, with changes saved to local storage.

### 2. **Product Fetching and Filtering**
   - **API Integration**: Products are fetched from the [FakeStoreAPI](https://fakestoreapi.com/).
   - **Product Search**: Users can search products by name.
   - **Filtering**: Products can be filtered by color, price, and categories (e.g., men's, women's, electronics, jewelry).
   - **Sorting**: Users can sort products based on various criteria.

### 3. **Shopping Cart Management**
   - **Add to Cart**: Users can add items to their cart and see the updated cart in real-time.
   - **Remove from Cart**: Users can remove items from the cart.
   - **Checkout**: Checkout functionality to finalize purchases, integrating Razorpay for secure payments.
   - **Local Storage**: Cart items are stored in local storage for persistence.

### 4. **Profile Page**
   - Display and allow editing of user data.
   - Changes are saved to local storage.

## Pages

- `index.html`: Home page
- `login.html`: Login page
- `signup.html`: Signup page
- `shop.html`: Product catalog
- `cart.html`: Shopping cart
- `profile.html`: User profile

## Tech Stack

- HTML5
- CSS3 (with Flexbox/Grid for layout)
- JavaScript (ES6+)
- Razorpay for payment integration
- [FakeStoreAPI](https://fakestoreapi.com/) for product data

## Setup & Installation

1. Clone this repository.
2. Open `index.html` in your browser to start using the application.

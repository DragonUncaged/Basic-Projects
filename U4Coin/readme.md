# Coin Tracker

A simple Coin Tracker application that displays live cryptocurrency data such as coin names, images, symbols, current prices, and total volume. The application fetches data from a local `data.json` file and allows users to search, filter, and sort the data in a responsive table.

## Features

- **Search Functionality**: Search for coins by name or symbol.
- **Sort by Market Cap**: Sort the coins by market capitalization in descending order.
- **Sort by Price Change**: Sort the coins by percentage change in the last 24 hours (positive or negative).
- **Responsive Design**: The table and controls are optimized for different screen sizes, including mobile devices.
- **Data from `data.json`**: The data is stored in a local `data.json` file to avoid API rate limits.

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/your-username/U4Coin.git
    ```

2. Navigate to the project directory:

    ```bash
    cd U4Coin
    ```

3. Open the `index.html` file in a web browser to see the application in action.

## Project Structure

- `index.html`: The main HTML file that contains the structure of the page.
- `style.css`: The CSS file for styling the page and ensuring responsiveness.
- `app.js`: The JavaScript file that contains the logic for fetching data, rendering it to the table, and handling user interactions such as search and sort.
- `data.json`: A JSON file that stores cryptocurrency data in a structured format.

## How It Works

1. **Fetching Data**: The `app.js` file uses the `fetch` API to get the data from the local `data.json` file. 
2. **Rendering Data**: Once the data is fetched, it is displayed in a table with columns for the coin's image, name, symbol, current price, total volume, and price change in the last 24 hours.
3. **Search**: The search bar allows users to search for coins by their name or symbol. The table updates dynamically based on the search input.
4. **Sorting**: There are two sorting buttons:
    - **Sort by Market Cap**: Sorts the coins in descending order based on market capitalization.
    - **Sort by Percentage Change**: Sorts the coins based on the percentage change in the last 24 hours, in descending order.

## Data Format (`data.json`)

The `data.json` file contains an array of objects representing different cryptocurrencies. Each object should have the following properties:

- `name`: The name of the cryptocurrency (e.g., Bitcoin).
- `id`: The unique identifier for the cryptocurrency.
- `image`: The URL to the image of the coin's logo.
- `symbol`: The symbol of the cryptocurrency (e.g., BTC).
- `current_price`: The current price of the cryptocurrency in USD.
- `total_volume`: The total trading volume of the cryptocurrency in the last 24 hours.
- `price_change_24h`: The percentage price change of the cryptocurrency in the last 24 hours.
- `market_cap`: The market capitalization of the cryptocurrency.

Example:

```json
[
  {
    "id": "bitcoin",
    "name": "Bitcoin",
    "symbol": "btc",
    "current_price": 45000,
    "total_volume": 50000000000,
    "price_change_24h": 2.5,
    "market_cap": 850000000000,
    "image": "https://cryptos.com/images/bitcoin.png"
  },
  {
    "id": "ethereum",
    "name": "Ethereum",
    "symbol": "eth",
    "current_price": 3500,
    "total_volume": 25000000000,
    "price_change_24h": 1.8,
    "market_cap": 400000000000,
    "image": "https://cryptos.com/images/ethereum.png"
  }
]
```

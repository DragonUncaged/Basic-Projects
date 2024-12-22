# Web Page Data Display from Multiple APIs

This project demonstrates how to fetch data from three different APIs and display the results on a webpage. The data is retrieved using promises with simulated delays, ensuring sequential data fetching and rendering.

## Project Overview

In this project, we have implemented a web page that displays data from three different APIs:

- **Posts API**: `https://dummyjson.com/posts`
- **Products API**: `https://dummyjson.com/products`
- **Todos API**: `https://dummyjson.com/todos`

Upon clicking a button, the data from all three APIs is fetched sequentially. Each API has a simulated delay (using `setTimeout`) before the data is fetched and displayed on the page.

## Features

- **Sequential Fetching**: Data from each API is fetched one after the other, ensuring the sequence is maintained.
- **Simulated Delays**: Each API call introduces a delay of 1000ms, 2000ms, and 3000ms respectively to simulate network latency.
- **Dynamic Table**: The data from each API is displayed in a table format on the webpage.

## Technologies Used

- **HTML**: For the basic structure and display of data.
- **CSS**: For styling the page and the table.
- **JavaScript (Promises)**: For handling asynchronous operations, simulating API delays, and chaining promises.
- **APIs**: 
  - [DummyJSON Posts API](https://dummyjson.com/posts)
  - [DummyJSON Products API](https://dummyjson.com/products)
  - [DummyJSON Todos API](https://dummyjson.com/todos)

## Instructions to Run

1. Clone this repository:
    ```bash
    git clone https://github.com/dragonuncaged/repository-name.git
    ```

2. Open the `index.html` file in your browser.

3. Click the "Fetch Data" button to start fetching data from the APIs. The data from each API will be displayed sequentially in a table.

## Code Explanation

- **HTML Structure**: Contains a button that, when clicked, triggers the fetching of data.
- **JavaScript Functions**:
  - `PromiseAPI1`: Fetches data from the posts API with a 1000ms delay.
  - `PromiseAPI2`: Fetches data from the products API with a 2000ms delay.
  - `PromiseAPI3`: Fetches data from the todos API with a 3000ms delay.
  
  Each function returns a promise that resolves after the data is fetched and displayed.

- **Promise Chaining**: The flow of API calls is handled using promise chaining, where each API call is made only after the previous one resolves.


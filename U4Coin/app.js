// Reference to the table body element to append data
let tableBody = document.querySelector(".table_body");

// Asynchronous function to fetch data from the local JSON file
async function loadData() {
    try {
        const response = await fetch('./data.json');
        const data = await response.json();

        let coinData = data;
        displayData(coinData);
    } catch (err) {
        console.error('Error fetching the data:', err);
    }
}

// Function to display data dynamically in the table
function displayData(coinData) {
    coinData.forEach(coin => {
        let priceChange24h = parseFloat(coin.price_change_24h).toFixed(2);
        let symbolUpper = coin.symbol.toUpperCase();

        // Create a table row for each coin
        let tableRow = document.createElement('tr');

        // Add the coin details to the row
        tableRow.innerHTML = `
            <td>
                <div class="coin-img">
                    <img src="${coin.image}" alt="" style="width: 45px; height: 45px" />
                    <div class="coin-name">${coin.name}</div>
                </div>
            </td>
            <td>${symbolUpper}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume}</td>
            <td class="price-change">${priceChange24h}%</td>
            <td>Market Cap: ${coin.market_cap}</td>
        `;

        // Select the price-change cell in the row for styling
        let priceChangeCell = tableRow.querySelector('.price-change');

        // Apply color based on price change percentage (positive or negative)
        if (priceChange24h < 0) {
            priceChangeCell.style.color = 'red';
        } else {
            priceChangeCell.style.color = 'green';
        }

        // Append the created row to the table body
        tableBody.appendChild(tableRow);
    });
}

// Function to update the table based on search input
function filterTable(searchQuery) {
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        // Filter the data based on the search term (coin name or symbol)
        const filteredCoins = data.filter(coin => {
            return coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                   coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
        });

        // Clear the existing table content before rendering filtered results
        tableBody.innerHTML = '';

        displayData(filteredCoins);
    })
    .catch(err => {
        console.error('Error while fetching filtered data:', err);
    });
}

// Event listener for handling user input in the search bar
document.getElementById('search_bar').addEventListener('keyup', function(event) {
    const searchQuery = event.target.value;
    filterTable(searchQuery);
});

// Function to sort data by Market Cap in descending order
function sortByMarketCap() {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const sortedByMarketCap = data.sort((a, b) => b.market_cap - a.market_cap);

        // Clear the table and render the sorted data
        tableBody.innerHTML = '';

        displayData(sortedByMarketCap);
    });
}

// Function to sort data by percentage change in descending order
function sortByPercentageChange() {
    fetch('./data.json')
    .then(response => response.json())
    .then(data => {
        const sortedByPercentageChange = data.sort((a, b) => b.price_change_24h - a.price_change_24h);

        // Clear the table and render the sorted data
        tableBody.innerHTML = '';

        displayData(sortedByPercentageChange);
    });
}

// Initial data load when the page is loaded
loadData();

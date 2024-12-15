# NASA Image of the Day Viewer

This web application allows users to view the NASA Image of the Day (APOD) for any selected date. The app also provides the functionality to view previously searched images from the search history.

## Features

- **Image of the Day (APOD)**: View the NASA image of the day for any selected date.
- **Search by Date**: Users can enter a date in the format `YYYY-MM-DD` to fetch the corresponding image and its description from NASA's Astronomy Picture of the Day API.
- **Search History**: The app saves search history locally and displays it on the page. Users can click on a date from the history to view the image again.
- **Image Display**: The app shows the title, description, and the image for the selected date.

## How It Works

1. **Fetch Image of the Day**: The app fetches the NASA Image of the Day using the NASA API (`https://api.nasa.gov/planetary/apod?api_key=IxKo`). 
2. **Search History**: All searched dates are saved in the local storage, and the search history is displayed on the page. 
3. **Display**: When the user submits a date, the app displays the corresponding image along with its title and description.

## Requirements

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection to fetch data from the NASA API.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/U4Nasa.git

# Files
- index.html: The main HTML structure for the app.
- style.css: Contains the styles for the app's layout.
- app.js: JavaScript file that contains the logic to fetch and display the image of the day, handle search functionality, and manage local storage for search history.

## Usage
- View the Image of the Day: Upon loading the page, the app displays the NASA image of the day for the current date.
- Search for a Specific Date: Enter a specific date (in YYYY-MM-DD format) in the search input and press enter to fetch and display the image for that date.
- View Search History: The app keeps a history of the dates you searched for. You can click on any date from the history to view the image for that date.
- Local Storage: The app saves the search history in localStorage so that it persists across page reloads.

## Code Breakdown
### Fetching the Image of the Day
  The app uses NASA's Astronomy Picture of the Day (APOD) API to fetch the image and its description. The API URL is constructed using the provided API key.

```javascript
function getImageOfTheDay(date) {
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        displayImage(data, date);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
```
### Displaying the Image and Description
  The fetched data (title, explanation, image URL) is displayed dynamically on the page.

```javascript
function displayImage(data, date) {
    const h2 = document.createElement('h2');
    h2.innerHTML = `Picture On ${date}`;

    const p = document.createElement('p');
    p.innerHTML = data.explanation;

    const h4 = document.createElement('h4');
    h4.innerHTML = data.title;

    const image = document.createElement('img');
    image.src = data.url;
    image.alt = data.title;

    currentImageContainer.innerHTML = '';
    currentImageContainer.appendChild(h2);
    currentImageContainer.appendChild(image);
    currentImageContainer.appendChild(h4);
    currentImageContainer.appendChild(p);
}
```
### Saving and Displaying Search History
The app saves the search date to localStorage and updates the search history section in the UI.

```javascript
function saveSearch(date) {
    const currentDateNow = new Date().toISOString().split('T')[0];
    if(date !== currentDateNow) {
        const searches = JSON.parse(localStorage.getItem('searches')) || [];
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function addSearchToHistory() {
    searchHistory.innerHTML = '';
    const searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date);
        });
        searchHistory.appendChild(listItem);
    });
}
```

### Event Listener for Date Search
- When the user submits a search form, the app fetches and displays the image for the entered date.

```javascript
searchForm.addEventListener('submit', event => {
    event.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

```

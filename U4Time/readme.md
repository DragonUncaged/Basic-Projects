# Timezone and Address Info Web Application

This web application retrieves the current user's timezone information using their geolocation. It also allows users to input a city name and retrieve timezone details for that location. The app fetches information such as the timezone name, latitude, longitude, and more.

## Features

- **Automatic Geolocation**: The app automatically detects the user's current geolocation (latitude and longitude) and displays relevant timezone information.
- **Address-based Timezone Information**: Users can input a city name to retrieve timezone details, including the timezone name, offset, and geographical information for that location.
- **Error Handling**: Displays appropriate error messages when invalid data is entered or when there's an issue fetching the information.

## How It Works

1. **Geolocation-based Timezone**:
   - The app fetches the user's current geolocation using the browser's geolocation API.
   - Using the obtained coordinates, it retrieves timezone details such as the timezone name, country, city, and geographical coordinates.
   
2. **City-based Timezone**:
   - Users can enter a city name in the input field.
   - The app uses a geocoding API to convert the city name into coordinates.
   - The coordinates are then used to retrieve timezone details for the specified city.

3. **Error Handling**:
   - If the input is empty or invalid, an error message is displayed.
   - If there is an issue with fetching the data, a suitable error message is displayed.

## Requirements

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection to fetch data from external APIs.
- Basic understanding of HTML, CSS, and JavaScript.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/timezone-address-info.git

## Usage
1. Geolocation-based Timezone:
  - When the page loads, the app automatically fetches and displays the timezone details for the user's current location.
2. City-based Timezone:
  - Enter a valid city name in the input field and click the Get Timezone button.
  - The app will display the timezone information for the entered city.
  - Error messages will be displayed if the input is invalid or if there's an issue with fetching the information.
3. Error Messages:
  - If no city is entered, or the entered address is invalid, an error message will be displayed.
  - If there is an issue with retrieving the timezone data, an error message will also be shown.

## Code Breakdown
- IIFE for Geolocation-based Timezone
- The Immediately Invoked Function Expression (IIFE) calls the getCurrentTimezone function as soon as the script runs. It checks if the browser supports geolocation and fetches the user's current position using the `navigator.geolocation.getCurrentPosition()` method.

```javascript
(function getCurrentTimezone() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showCurrentTimezone);
    } else {
        error.innerHTML = 'Geolocation is not supported by this browser.';
    }
}());
```

### Fetching Timezone Data by Geolocation
Once the coordinates are obtained, a request is made to the Geoapify API to get the timezone details based on latitude and longitude.

```javascript
function showCurrentTimezone(currentPosition) {
    const latitude = currentPosition.coords.latitude;
    const longitude = currentPosition.coords.longitude;

    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=YOUR_API_KEY`;

    fetch(url)
        .then(response => response.json())
        .then(res => {
            // Displaying fetched timezone info
        })
        .catch(err => resultBox.style.display = err);
}
```

### Fetching Timezone Data by Address
The user can input a city name to fetch timezone details. The city is first converted to coordinates using the Geoapify geocoding API, and then the timezone details are fetched using those coordinates.

```javascript
function fetchDetailsByAdress() {
    let address = document.querySelector("#address").value;

    if (address.trim() === "") {
        error.innerHTML = "Please Enter City name";
        resultBox.style.display = 'none';
        document.querySelector("#address").value = "";
        return;
    }

    if (!validateAddress(address)) {
        error.innerHTML = "Please Enter a valid Address";
        resultBox.style.display = 'none';
        document.querySelector("#address").value = "";
        return;
    }

    const geocodingUrl = `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=YOUR_API_KEY`;

    fetch(geocodingUrl)
        .then(response => response.json())
        .then(res => {
            // Fetching timezone details using coordinates
        })
        .catch(() => {
            resultBox.style.display = 'none';
            error.innerHTML = `An error occurred while geocoding the address: Please Enter Valid City`;
            document.querySelector("#address").value = "";
        });
}

```
### Validate Address
A simple function to validate the address input using a regular expression.

```javascript
function validateAddress(address) {
    var addressPattern = /^[a-zA-Z0-9\s\.,#'-]+$/;
    if (addressPattern.test(address)) {
        return true;
    } else {
        return false;
    }
}

```












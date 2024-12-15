# IP Address Information and Post Offices Finder

This web application retrieves information about a user's IP address and provides details such as their geolocation, city, region, organization, timezone, and more. It also allows users to find nearby post offices by postal code.

## Features

- **IP Address Information**: Retrieves detailed information about the user's IP address, including location, organization, region, and timezone.
- **Geolocation Mapping**: Displays the user's location on an embedded Google Map using latitude and longitude.
- **Nearby Post Offices**: Users can view a list of nearby post offices by entering their postal code. The app displays the name, branch type, delivery status, district, and division of each post office.
- **Search Functionality**: Users can search for post offices by name or branch type.
- **IP Retrieval**: The app fetches the user's public IP address using a third-party API and saves it in local storage for future use.

## How It Works

1. **IP Address Information**:
   - The app retrieves the user's IP address from local storage (or fetches it from an external API if it's not stored).
   - It then fetches details about the user's IP, such as city, region, organization, timezone, and geographical coordinates, using the `ipapi` API.

2. **Location Mapping**:
   - Once the user's location is fetched, the app displays it on an embedded Google Map using the latitude and longitude.

3. **Post Office Search**:
   - The app uses the postal code to fetch a list of nearby post offices from the `api.postalpincode.in` API.
   - Users can filter the displayed post offices by name or branch type using a search input.

4. **Event Handling**:
   - When the user clicks the "Start" button, they are redirected to a detailed page with more information.

## Requirements

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Internet connection to fetch data from external APIs.
- Basic knowledge of HTML, CSS, and JavaScript.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ip-info-post-office-finder.git


### Files
- index.html: The main HTML structure for the app.
- style.css: Contains the styles for the app's interface.
- app.js: The JavaScript file that handles fetching IP address information, geolocation, post office details, and more.

### Usage
## IP Address Information:

- Upon loading the page, the app fetches the user's IP address and displays detailed information, including location, organization, region, and timezone.
- The app also fetches the geographical coordinates (latitude and longitude) and displays them on an embedded Google Map.

### Post Office Search:

- Enter a postal code to retrieve nearby post offices.
- The app displays post office details like name, branch type, delivery status, district, and division.
- You can search and filter post offices by name or branch type using the search input.

### Start Button:

- Clicking the Start button redirects you to a detailed page (e.g., details.html), where further information might be displayed.

### Error Handling:

- If the app fails to retrieve data (e.g., IP information or post offices), it logs the error in the console.
- The search feature will display matching post offices as you type in the input field.

### Code Breakdown
- Getting User's Public IP Address
- The app first checks if the user's IP address is stored in localStorage. If not, it fetches the IP address using the ipify API.

```javascript
async function getPublicIp(){
    try {
        const ipUrl = 'https://api.ipify.org?format=json';

        let response = await fetch(ipUrl);
        let data = await response.json();

        ip.innerText = data.ip;
        localStorage.setItem("myIp", data.ip);
    }
    catch(error) {
        console.log(error);
    }
}
```
### Fetching IP Address Information
  Once the IP address is retrieved (from localStorage or the ipify API), the app fetches detailed information about the IP address using the ipapi API.

```javascript
async function hitApi(){
    try {
        let url = `https://ipapi.co/${IP}/json/`;

        let response = await fetch(url);
        let data = await response.json();

        return data;
    }
    catch(error) {
        console.log(error);
    }
}
```
### Collecting and Displaying Information
  The collectInfo() function fetches the IP address information and displays the user's location (latitude, longitude), city, organization, region, and timezone. It also fetches nearby post offices based on the postal code.

```javascript
async function collectInfo(){
    let data = await hitApi();

    let location = {
        lat: data.latitude,
        lng: data.longitude
    };

    let info =  {
        location: location,
        city: data.city,
        organisation: data.org,
        region: data.region,
        timeZone: data.timezone,
        pinCode: data.postal
    };

    let currentDateTime = new Date().toLocaleString("en-US", { timeZone: info.timeZone });

    let postOffices = await getNearbyPostOffices(info.pinCode);

    displayPostOffices(postOffices);
    document.querySelector('.lat span').innerText = info.location.lat;
    document.querySelector('.long span').innerText = info.location.lng;
    // Other fields displayed here...
}
```
### Fetching Nearby Post Offices
  The app uses the postal code to get a list of nearby post offices from the api.postalpincode.in API.

```javascript
async function getNearbyPostOffices(pincode) {
    try {
        const apiUrl = `https://api.postalpincode.in/pincode/${pincode}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        let postOffices = data[0].PostOffice;

        return postOffices;
    }
    catch(error) {
        console.log(error);
    }
}
```
### Displaying Post Offices
  The app displays the fetched post offices in a grid layout, showing details like name, branch type, delivery status, district, and division.

```javascript
function displayPostOffices(postOffices){
    let poContainer = document.querySelector('.po-grid');
    poContainer.innerHTML = '';
    postOffices.forEach(e => {
        let poCard = document.createElement('div');
        poCard.className = 'po-box';
        poCard.innerHTML = `
            <p class="name"><b>Name : </b><span>${e.Name}</span></p>
            <p class="branch-name"><b>Branch Type : </b><span>${e.BranchType}</span></p>
            <p class="delivery-status"><b>Delivery Status : </b><span>${e.DeliveryStatus}</span></p>
            <p class="district"><b>District : </b><span>${e.District}</span></p>
            <p class="division"><b>Division : </b><span>${e.Division}</span></p>
        `;

        poContainer.append(poCard);
    })
}
```


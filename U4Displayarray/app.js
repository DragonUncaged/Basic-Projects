// Promise function for API 1 (posts)
function promiseAPI1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch("https://dummyjson.com/posts")
                .then((res) => res.json())
                .then((data) => {
                    displayData(data.posts, "postsData");
                    resolve(true);
                })
                .catch((err) => reject(err));
        }, 1000);
    });
}

// Promise function for API 2 (products)
function promiseAPI2(prevResolved) {
    // Check if promiseAPI1 was successfully resolved
    if (!prevResolved) return Promise.reject("promiseAPI1 not resolved");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch("https://dummyjson.com/products")
                .then((res) => res.json())
                .then((data) => {
                    displayData(data.products, "productsData");
                    resolve(true);
                })
                .catch((err) => reject(err));
        }, 2000);
    });
}

// Promise function for API 3 (todos)
function promiseAPI3(prevResolved) {
    // Check if promiseAPI2 was successfully resolved
    if (!prevResolved) return Promise.reject("promiseAPI2 not resolved");
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            fetch("https://dummyjson.com/todos")
                .then((res) => res.json())
                .then((data) => {
                    displayData(data.todos, "todosData");
                    resolve(true);
                })
                .catch((err) => reject(err));
        }, 3000);
    });
}

// Start the promise chain
function startChaining() {
    promiseAPI1()
        .then(promiseAPI2)
        .then(promiseAPI3)
        .catch((error) => console.error("Error:", error));
}

// Display data in a table
function displayData(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear old data

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    // Generate table headers from the first item's keys
    const firstItem = items[0];
    for (let key in firstItem) {
        const th = document.createElement("th");
        th.textContent = key;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Generate table rows
    const tbody = document.createElement("tbody");
    items.forEach((item) => {
        const row = document.createElement("tr");
        for (let key in firstItem) {
            const td = document.createElement("td");
            td.textContent = item[key];
            row.appendChild(td);
        }
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    container.appendChild(table);
}

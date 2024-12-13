
// Define the URL
const apiUrl = "https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json";

// Fetch data from the API
fetch(apiUrl).then(responce => responce.json()).then(data => {

    function addRow(e) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-cell">
                    <img class="dp" src="${e.img_src}" alt="">
                    <span>${e.first_name+' '+e.last_name}</span>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing?'Passed':'Failed'}</td>
            <td>${e.email}</td>
        `;
        document.querySelector('#combine>#tableContent').append(row);
    }
    data.forEach(addRow);

    // Add event listener
    let btnList = document.querySelectorAll('.btn');

    let atoz = data.map(e => e);
    atoz.sort((a, b) => (a.first_name+' '+a.last_name).localeCompare(b.first_name+' '+b.last_name));
    btnList[0].addEventListener('click', () => {
        search.value = '';
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');
        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());
        atoz.forEach(addRow);
    })

    let ztoa = data.map(e => e);
    ztoa.sort((b, a) => (a.first_name+' '+a.last_name).localeCompare(b.first_name+' '+b.last_name));
    btnList[1].addEventListener('click', () => {
        search.value = '';
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');
        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());
        ztoa.forEach(addRow);
    })

    let byMarks = data.map(e => e);
    byMarks.sort((a, b) => a.marks - b.marks);
    btnList[2].addEventListener('click', () => {
        search.value = '';
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');
        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());
        byMarks.forEach(addRow);
    })

    let byPassing = data.filter(e => e.passing)
    btnList[3].addEventListener('click', () => {
        search.value = '';
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');
        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());
        byPassing.forEach(addRow);
    })

    let byClass = data.map(e => e);
    byClass.sort((a, b) => a.class - b.class);
    btnList[4].addEventListener('click', () => {
        search.value = '';
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');
        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());
        byClass.forEach(addRow);
    })


    function addFemaleRow(e) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-cell">
                    <img class="dp" src="${e.img_src}" alt="">
                    <span>${e.first_name+' '+e.last_name}</span>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing?'Passed':'Failed'}</td>
            <td>${e.email}</td>
        `;
        document.querySelector('#female>#tableContent-female').append(row);
    }

    function addMaleRow(e) {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td align="center">${e.id}</td>
            <td>
                <div class="name-cell">
                    <img class="dp" src="${e.img_src}" alt="">
                    <span>${e.first_name+' '+e.last_name}</span>
                </div>
            </td>
            <td>${e.gender}</td>
            <td>${e.class}</td>
            <td>${e.marks}</td>
            <td>${e.passing?'Passed':'Failed'}</td>
            <td>${e.email}</td>
        `;
        document.querySelector('#male>#tableContent-male').append(row);
    }

    let femaleArray = data.filter(e => e.gender == 'Female');
    femaleArray.forEach((e) => {
        addFemaleRow(e);
    });
    
    let maleArray = data.filter(e => e.gender == 'Male');
    maleArray.forEach((e) => {
        addMaleRow(e);
    });
    
    btnList[5].addEventListener('click', () => {
        search.value = '';
        female.classList.remove('t-none');
        male.classList.remove('t-none');
        combine.classList.add('t-none');
    })


    // Search functionality
    search.addEventListener('input', doSearch);
    document.querySelector('#search-btn').addEventListener('click', doSearch);

    function doSearch() {
        female.classList.add('t-none');
        male.classList.add('t-none');
        combine.classList.remove('t-none');

        document.querySelectorAll('#tableContent>tr').forEach((e) => e.remove());

        let key = search.value.toLowerCase();

        let searchArray = data.filter( e => {
            return e.first_name.toLowerCase().includes(key) || e.first_name.toLowerCase().includes(key) || e.first_name.toLowerCase().includes(key);
        })

        searchArray.forEach(e => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td align="center">${e.id}</td>
                <td>
                    <div class="name-cell">
                        <img class="dp" src="${e.img_src}" alt="">
                        <span>${e.first_name+' '+e.last_name}</span>
                    </div>
                </td>
                <td>${e.gender}</td>
                <td>${e.class}</td>
                <td>${e.marks}</td>
                <td>${e.passing?'Passed':'Failed'}</td>
                <td>${e.email}</td>
            `;
            
            document.querySelector('#combine>#tableContent').append(row);
        });
    }
});
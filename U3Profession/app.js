const empListContainer = document.getElementById("employeeList");
const empCountDisplay = document.getElementById("employeeCount");

function addEmployee() {
    const feedback = document.getElementById("feedback");
    const empName = document.getElementById("empName").value.trim();
    const empJob = document.getElementById("empJob").value.trim();
    const empAge = document.getElementById("empAge").value.trim();
    const uniqueID = "emp" + Math.random().toString(36).substring(2, 9);

    if (!empName || !empJob || !empAge) {
        feedback.innerHTML = `<span class="error-msg">Error: Please fill out all fields before adding an employee.</span>`;
        return;
    } else {
        feedback.innerHTML = `<span class="success-msg">Success: Employee added!</span>`;
    }

    const employeeData = JSON.parse(localStorage.getItem("employees")) || [];
    const newEmployee = { id: uniqueID, name: empName, job: empJob, age: empAge };
    localStorage.setItem("employees", JSON.stringify([...employeeData, newEmployee]));

    refreshEmployeeList();
    document.getElementById("empName").value = "";
    document.getElementById("empJob").value = "";
    document.getElementById("empAge").value = "";
}

function deleteEmployee(employeeID) {
    const employeeData = JSON.parse(localStorage.getItem("employees")) || [];
    const updatedData = employeeData.filter((emp) => emp.id !== employeeID);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    refreshEmployeeList();
}

function refreshEmployeeList() {
    const employeeData = JSON.parse(localStorage.getItem("employees")) || [];
    if (employeeData.length === 0) {
        empListContainer.innerHTML = `<div class="no-data">No employees found.</div>`;
        empCountDisplay.textContent = "You have 0 Employees.";
    } else {
        empListContainer.innerHTML = employeeData
            .map(
                (emp) =>
                    `<div class="employee-entry">
                        <div class="info">
                            <p>${emp.name}</p>
                            <p>${emp.job}</p>
                            <p>${emp.age}</p>
                        </div>
                        <button onclick="deleteEmployee('${emp.id}')">Delete</button>
                    </div>`
            )
            .join("");
        empCountDisplay.textContent = `You have ${employeeData.length} Employees.`;
    }
}

refreshEmployeeList();
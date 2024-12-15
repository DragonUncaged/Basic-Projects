let todayTasks = [];
let futureTasks = [];
let finishedTasks = [];

let taskDetailsInput = document.querySelector('.task_detail');
let dueDateInput = document.querySelector('.date');
let prioritySelector = document.getElementById('priority');

// Function to sort tasks by priority (higher priority first)
function sortTasksByPriority(taskList) {
    const priorityLevels = { high: 3, medium: 2, low: 1 };
    return taskList.sort((taskA, taskB) => priorityLevels[taskB.priority] - priorityLevels[taskA.priority]);
}

// Helper to capitalize the first letter of a word
function formatString(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Save all tasks into localStorage for persistence
function saveTasksToStorage() {
    const combinedTasks = todayTasks.concat(futureTasks).concat(finishedTasks);
    localStorage.setItem('taskDatabase', JSON.stringify(combinedTasks));
}

// Retrieve and categorize tasks from localStorage
function loadTasksFromStorage() {
    const storedData = localStorage.getItem('taskDatabase');
    if (storedData) {
        const allTasks = JSON.parse(storedData);

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        todayTasks = [];
        futureTasks = [];
        finishedTasks = [];

        allTasks.forEach(task => {
            const taskDate = new Date(task.date);
            taskDate.setHours(0, 0, 0, 0);
            if (!task.completed && taskDate.getTime() === today.getTime()) {
                todayTasks.push(task);
            } else if (!task.completed && taskDate.getTime() > today.getTime()) {
                futureTasks.push(task);
            } else if (task.completed) {
                finishedTasks.push(task);
            }
        });
    }
}

// Initialize tasks and display on page load
window.addEventListener('load', () => {
    loadTasksFromStorage();
    renderTasks();
});

// Add a new task
let addTaskBtn = document.getElementById('main_btn');
addTaskBtn.addEventListener('click', () => {
    let taskDueDate = new Date(dueDateInput.value);
    let currentDay = new Date();

    taskDueDate.setHours(0, 0, 0, 0);
    currentDay.setHours(0, 0, 0, 0);

    // Validate inputs and date
    if (taskDetailsInput.value === '' || dueDateInput.value === '' || prioritySelector.value === '') {
        alert('Please fill in all required fields.');
    } else if (taskDueDate.getTime() > currentDay.getTime()) {
        let newTask = { name: taskDetailsInput.value, date: taskDueDate, priority: prioritySelector.value, completed: false };
        futureTasks.push(newTask);
        renderTasks();
    } else if (taskDueDate.getTime() === currentDay.getTime()) {
        let newTask = { name: taskDetailsInput.value, date: taskDueDate, priority: prioritySelector.value, completed: false };
        todayTasks.push(newTask);
        renderTasks();
    } else {
        alert('You cannot choose a past date for the task.');
    }

    // Reset form fields after adding task
    taskDetailsInput.value = '';
    dueDateInput.value = '';
    prioritySelector.selectedIndex = 0;

    saveTasksToStorage();
});

// Function to display tasks in respective categories
function renderTasks() {
    let todayContainer = document.querySelector('.Today_box_container1');
    let futureContainer = document.querySelector('.Today_box_container2');
    let completedContainer = document.querySelector('.Today_box_container3');

    todayContainer.innerHTML = '';
    futureContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    // Sort tasks before displaying
    const sortedTodayTasks = sortTasksByPriority(todayTasks);
    const sortedFutureTasks = sortTasksByPriority(futureTasks);
    const sortedFinishedTasks = sortTasksByPriority(finishedTasks);

    let todayCount = 0;
    let futureCount = 0;
    let finishedCount = 0;

    // Render tasks for today
    sortedTodayTasks.forEach(task => {
        todayCount++;
        todayContainer.innerHTML += `
            <div class="box_body1">
                <div class="body_item1">
                    <p class="normal_text1">${todayCount}. ${task.name}</p>
                </div>
                <div class="body_item2">
                    <p class="normal_text1">${formatDateForDisplay(task.date)}</p>
                </div>
                <div class="body_item3">
                    <p class="normal_text1">${formatString(task.priority)}</p>
                </div>
                <div class="body_item4">
                    <img src="img/check-circle 1.png" alt="" class="markComplete" data-task-type="today" data-task-index="${todayCount - 1}">
                    <img src="img/trash 1.png" alt="" class="deleteTask" data-task-type="today" data-task-index="${todayCount - 1}">
                </div>
            </div>
        `;
    });

    // Render upcoming tasks
    sortedFutureTasks.forEach(task => {
        futureCount++;
        futureContainer.innerHTML += `
            <div class="box_body1">
                <div class="body_item1">
                    <p class="normal_text1">${futureCount}. ${task.name}</p>
                </div>
                <div class="body_item2">
                    <p class="normal_text1">${formatDateForDisplay(task.date)}</p>
                </div>
                <div class="body_item3">
                    <p class="normal_text1">${formatString(task.priority)}</p>
                </div>
                <div class="body_item4">
                    <img src="img/check-circle 1.png" alt="" class="markComplete" data-task-type="future" data-task-index="${futureCount - 1}">
                    <img src="img/trash 1.png" alt="" class="deleteTask" data-task-type="future" data-task-index="${futureCount - 1}">
                </div>
            </div>
        `;
    });

    // Render completed tasks
    sortedFinishedTasks.forEach(task => {
        finishedCount++;
        completedContainer.innerHTML += `
            <div class="box_body2">
                <div class="body_item1">
                    <p class="normal_text2">${finishedCount}. ${task.name}</p>
                </div>
                <div class="body_item2">
                    <p class="normal_text2">${formatDateForDisplay(task.date)}</p>
                </div>
                <div class="body_item3">
                    <p class="normal_text2">${formatString(task.priority)}</p>
                </div>
                <div class="body_item4">
                    <img src="img/2.png" alt="" class="colored-image deleteTask" data-task-type="completed" data-task-index="${finishedCount - 1}">
                </div>
            </div>
        `;
    });

    // Event listeners for marking tasks as complete
    let completeButtons = document.querySelectorAll('.markComplete');
    completeButtons.forEach(button => {
        button.addEventListener('click', () => {
            let category = button.getAttribute('data-task-type');
            let index = parseInt(button.getAttribute('data-task-index'));

            if (category === 'today') {
                let task = todayTasks.splice(index, 1)[0];
                task.completed = true;
                finishedTasks.push(task);
            } else if (category === 'future') {
                let task = futureTasks.splice(index, 1)[0];
                task.completed = true;
                finishedTasks.push(task);
            }

            renderTasks();
            saveTasksToStorage();
        });
    });

    // Event listeners for deleting tasks
    let deleteButtons = document.querySelectorAll('.deleteTask');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            let category = button.getAttribute('data-task-type');
            let index = parseInt(button.getAttribute('data-task-index'));

            if (category === 'today') {
                todayTasks.splice(index, 1);
            } else if (category === 'future') {
                futureTasks.splice(index, 1);
            } else if (category === 'completed') {
                finishedTasks.splice(index, 1);
            }

            renderTasks();
            saveTasksToStorage();
        });
    });
}

// Convert date to a readable string format
function formatDateForDisplay(date) {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return '';
    }
    return parsedDate.toLocaleDateString('en-GB');
}

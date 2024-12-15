# To-Do List Web Application

This is a simple to-do list web application that allows users to manage their tasks with functionalities like adding, deleting, and marking tasks as completed. It also supports categorizing tasks into **Today’s Tasks**, **Upcoming Tasks**, and **Completed Tasks**. Data is stored in the browser's local storage so that tasks persist across page reloads.

## Features

- **Add Item**: Allows users to add new tasks by specifying the task name, due date, and priority.
- **Delete Item**: Each task can be deleted from the list.
- **Complete Task**: Tasks can be marked as completed.
- **Prioritize Tasks**: Tasks are displayed in order of priority (High, Medium, Low).
- **Sections**: Tasks are categorized into three sections:
  - **Today’s Tasks**: Tasks with today's date.
  - **Upcoming Tasks**: Tasks with future due dates.
  - **Completed Tasks**: Tasks that have been marked as completed.
- **Local Storage**: Tasks are saved in local storage to persist data even after page reload.

## How It Works

1. **Adding Tasks**: 
   - Users can input a task name, set a due date, and choose a priority.
   - Tasks with today's date are added to the "Today’s Tasks" section, while tasks with future dates are added to the "Upcoming Tasks" section.
   
2. **Marking Tasks as Completed**:
   - Tasks can be marked as completed and will then be moved to the "Completed Tasks" section.

3. **Deleting Tasks**: 
   - Tasks can be deleted by clicking the trash icon next to each task.

4. **Data Storage**:
   - Tasks are saved in the browser's local storage so they persist even when the page is reloaded.

## Requirements

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Basic knowledge of HTML, CSS, and JavaScript


## How to Use
- Enter a task name in the "Item Name" field.
- Select a due date using the date picker.
- Choose a priority (High, Medium, Low) from the dropdown.
- Click the Add Item button to add the task to the list.
- The task will be categorized under Today’s Tasks, Upcoming Tasks, or Completed Tasks based on the due date and completion status.
- Click the check mark icon to mark a task as completed or the trash icon to delete it.

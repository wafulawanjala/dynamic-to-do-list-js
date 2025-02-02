document.addEventListener("DOMContentLoaded", function () {
    // Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim input value

        if (taskText === "") {
            alert("Please enter a task."); // Alert if input is empty
            return;
        }

        // Create a new task list item (li)
        const listItem = document.createElement("li");
        listItem.textContent = taskText;

        // Create a remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";

        // Add the 'remove-btn' class to the remove button using classList.add
        removeButton.classList.add("remove-btn");

        // Remove task when button is clicked
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
        };

        // Append button to list item and list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Add a class for styling the task item (e.g., task-added)
        listItem.classList.add("task-added");

        // Clear the input field
        taskInput.value = "";
    }

    // Attach event listener to "Add Task" button
    addButton.addEventListener("click", addTask);

    // Allow task addition via "Enter" key
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});

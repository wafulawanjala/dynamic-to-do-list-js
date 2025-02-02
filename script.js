document.addEventListener("DOMContentLoaded", function () {
    // Select DOM Elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from localStorage when the page loads
    loadTasksFromLocalStorage();

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
            removeTaskFromLocalStorage(taskText); // Remove from localStorage
        };

        // Append button to list item and list item to task list
        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Add a class for styling the task item (e.g., task-added)
        listItem.classList.add("task-added");

        // Save task to localStorage
        saveTaskToLocalStorage(taskText);

        // Clear the input field
        taskInput.value = "";
    }

    // Function to save task to localStorage
    function saveTaskToLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText); // Add the new task to the array
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage with the new task list
    }

    // Function to load tasks from localStorage and display them
    function loadTasksFromLocalStorage() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || []; // Retrieve tasks from localStorage

        tasks.forEach(function (taskText) {
            const listItem = document.createElement("li");
            listItem.textContent = taskText;

            // Create a remove button for each task
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remove";
            removeButton.classList.add("remove-btn");

            // Remove task when button is clicked
            removeButton.onclick = function () {
                taskList.removeChild(listItem);
                removeTaskFromLocalStorage(taskText); // Remove from localStorage
            };

            // Append the remove button to the list item, and the list item to the task list
            listItem.appendChild(removeButton);
            taskList.appendChild(listItem);

            // Add class for styling the task item
            listItem.classList.add("task-added");
        });
    }

    // Function to remove task from localStorage
    function removeTaskFromLocalStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(task => task !== taskText); // Filter out the removed task
        localStorage.setItem("tasks", JSON.stringify(tasks)); // Update localStorage with the new task list
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

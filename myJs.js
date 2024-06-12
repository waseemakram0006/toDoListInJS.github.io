document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Load tasks from local storage on page load
    loadTasks();
  
    // Add task event listener
    addTaskBtn.addEventListener("click", function () {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        addTask(taskText);
        saveTasks(); // Save tasks to local storage
        taskInput.value = ""; // Clear input field after adding task
      } else {
        alert("Please enter a task!");
      }
    });
  
    // Function to add a new task
    function addTask(taskText) {
      const taskItem = document.createElement("li");
      taskItem.classList.add("task-item");
      taskItem.innerHTML = `
        <span>${taskText}</span>
        <div class="task-buttons">
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
  
      taskItem.querySelector(".delete-btn").addEventListener("click", function () {
        taskItem.remove();
        saveTasks(); // Save tasks to local storage after deletion
      });
  
      taskItem.querySelector(".complete-btn").addEventListener("click", function () {
        taskItem.classList.toggle("completed");
        saveTasks(); // Save tasks to local storage after completion
      });
  
      taskList.appendChild(taskItem);
    }
  
    // Function to save tasks to local storage
    function saveTasks() {
      const tasks = [];
      const taskItems = document.querySelectorAll(".task-item");
  
      taskItems.forEach(function (taskItem) {
        tasks.push({
          text: taskItem.querySelector("span").textContent,
          completed: taskItem.classList.contains("completed"),
        });
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to load tasks from local storage
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem("tasks"));
  
      if (tasks) {
        tasks.forEach(function (task) {
          addTask(task.text);
          const taskItem = taskList.lastElementChild;
  
          if (task.completed) {
            taskItem.classList.add("completed");
          }
        });
      }
    }
  });
  
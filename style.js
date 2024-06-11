// app.js
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      saveTasksToLocalStorage();
      renderTasks();
    });
    taskItem.appendChild(taskText);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
  });
}

// Save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Add new task
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText);
    saveTasksToLocalStorage();
    renderTasks();
    taskInput.value = '';
  }
});

// Initialize
renderTasks();
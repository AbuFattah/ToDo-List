// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // Add task event
  document.addEventListener('DOMContentLoaded',getTask);
  form.addEventListener('submit', addTask);
  taskList.addEventListener('click', removeTask);
  clearBtn.addEventListener('click', clearTasks);
  filter.addEventListener('keyup', filterTasks);
}


// Get tasks from LS
function getTask(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  
  tasks.forEach(function(task){
       // Create li element
   const li = document.createElement('li');
   // Add class
   li.className = 'collection-item';
   // Create text node and append to li
   li.appendChild(document.createTextNode(task));
   // Create new link element
   const link = document.createElement('a');
   // Add class
   link.className = 'delete-item secondary-content';
   // Add icon html
   link.innerHTML = '<i class="fa fa-remove"></i>';
   // Append the link to li
   li.appendChild(link);

   // Append li to ul
   taskList.appendChild(li);
  });
}


// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }
  else {
    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    // Add class
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append li to ul
    taskList.appendChild(li);
    storeTaskInLocalStorage(taskInput.value);
    // Clear input
    taskInput.value = '';
  }

  e.preventDefault();
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
}


function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
    e.target.parentElement.parentElement.remove();
    }
  }

   removeFromLocalStorage(e.target.parentElement.parentElement);
}

function removeFromLocalStorage(e){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task,index){
    if(task === e.textContent){
      tasks.splice(index,1);
    }
  });
  
  localStorage.setItem('tasks',JSON.stringify(tasks));

}


function clearTasks(e) {
  if (confirm('Are you sure?')) {
    // let liCount = taskList.children.length;
    // let i = 1;
    // taskList.innerHTML = '';
    while (taskList.firstChild) {

      taskList.removeChild(taskList.firstChild);

      // i++;
    }
  }

  //Clear tasks from LS
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
  localStorage.clear();
}


function filterTasks(e) {

  document.querySelectorAll('.collection-item').forEach(
    function (task) {

      const text = e.target.value.toLowerCase();
      const item = task.firstChild.textContent.toLowerCase();

      if (item.indexOf(text) != -1) {
        task.style.display = 'block';
      }
      else {
        task.style.display = 'none';
      }
    }
  );
}

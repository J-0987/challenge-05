// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
let taskTitleInput = $('#taskTitle');
let taskDueDateInput = $('#taskDueDate');
let taskDescriptionInput = $('taskDescription');
let addTaskBtn = $('#add-task-btn');

const taskCardInput = {
  title: taskTitleInput.val(),
  dueDate: taskDueDateInput.val(),
  description: taskDescriptionInput.val()
};

// upon clicking thr addtaskbutton, I want the information stored in an object and into local storage
function setToLocalStorage(taskCardInput){
  
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskCardInput);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

addTaskBtn.click(function() {
  const task = {
      title: taskTitleInput.val(),
      dueDate: taskDueDateInput.val(),
      description: taskDescriptionInput.val()
  };

  setToLocalStorageTaskToLocalStorage(task);
  renderTaskCard(task);
 

  // Clear inputs
  taskTitleInput.val("");
  taskDueDateInput.val("");
  taskDescriptionInput.val("");
});


function renderTaskCard(task) {
  const taskList = $("#todo-tasks");
  const taskCard = $("<div>").addClass("task-card").attr("draggable", "true").html(`
      <h3>${task.title}</h3>
      <p>Due Date: ${task.dueDate}</p>
      <p>${task.description}</p>
  `);
  taskList.append(taskCard);
}
// Todo: create a function to generate a unique task id. Is this nextId? why??
function generateTaskId() {
 let taskId = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 1000); // Adjust the range as needed
  return `task_${timestamp}_${randomNum}`;
}


// Todo: create a function to create a task card
// create div with elements for taskTitle, taskDueDate, and taskDescription. Delte button also needed
function createTaskCard(task) {
  

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
})
}

// Todo: create a function to handle adding a new task


// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});

$( function() {
    $( "#taskDueDate" ).datepicker();
  } ); 
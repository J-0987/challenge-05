
// Retrieve tasks and nextId from localStorage

let taskTitleInput = $('#taskTitle');
let taskDueDateInput = $('#taskDueDate');
let taskDescriptionInput = $('#taskDescription');
let addTaskBtn = $('#add-task-btn');
let inProgress = $('#in-progress');
let toDoCards = $('#todo-cards');
let inProgressCard = $('#in-progress-cards');
let doneCard = $('#done-cards');

let formatStr = "HH:mm:ss";
let currentTime = dayjs().format(formatStr) || null;
if (!currentTime) {
  console.log("dayjs not found")

};
console.log(currentTime);

// methd is a function on an object. Property - blue icons-single values. 

// upon clicking thr addtaskbutton, I want the information stored in an object and into local storage
function setToLocalStorage(taskCardInput) {

  ///[] prevents tasks from being undefined. Because push method (an array method) cannot be ued on undefined. It has to be an empty. Can only used array methods on arrays.
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskCardInput);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}



addTaskBtn.click(function () {
  // Create a task object with the input values and a generated task id
  const task = {
    title: taskTitleInput.val(),
    dueDate: taskDueDateInput.val(),
    description: taskDescriptionInput.val(),
    id: generateTaskId(),
    status: 'to-do'
  };
  
  // Store the task object in local storage
  setToLocalStorage(task);
  
  // Render the task card for the new task
  renderTaskCard(task);
  
  // Render the updated task list
  renderTaskList();

  // Clear the input fields
  taskTitleInput.val("");
  taskDueDateInput.val("");
  taskDescriptionInput.val("");
});



// Todo: create a function to generate a unique task id. built in constructors.
function generateTaskId() {

  const randomNum = Math.floor(Math.random() * 1000); // Adjust the range as needed
  return randomNum;
}


// Todo: create a function to create a task card
// create div with elements for taskTitle, taskDueDate, and taskDescription. Delte button also needed
// Function to render a task card
function renderTaskCard(task) {
  // Create a div element with the appropriate classes and data attribute
  const taskCard = $("<div>")
    .addClass("task-card draggable")
    .attr("data-task-id", task.id);

  // Create the card header element with the task title
  const cardHeader = $('<div>').addClass('card-header h4').text(task.title);

  // Create the card body element
  const cardBody = $('<div>').addClass('card-body');

  // Create the card description element with the task description
  const cardDescription = $('<p>').addClass('card-text').text(task.description);

  // Create the card due date element with the task due date
  const cardDueDate = $('<p>').addClass('card-text').text(task.dueDate);

  // Create the delete button element
  const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-task-id', task.id);

  // Add a click event listener to the delete button
  cardDeleteBtn.on('click', handleDeleteTask);

  // Append the card description, due date, and delete button to the card body
  cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);

  // Append the card header and card body to the task card
  taskCard.append(cardHeader, cardBody);

  // Return the task card
  return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
/**
 * Renders the task list based on the tasks retrieved from local storage.
 * The tasks are categorized into three lists: to-do, in-progress, and done.
 * Each task is rendered as a task card and appended to the corresponding list.
 * The task cards are made draggable using jQuery UI.
 */
function renderTaskList() {
  const tasks = getTasksFromLocalStorage();
  const todoList = $('#todo-cards')
  todoList.empty();
  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of tasks) {
    if (task.status === 'to-do') {
      todoList.append(renderTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(renderTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(renderTaskCard(task));
    }
    else {
      console.log("render done");
    }
  }

  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
  })
  const draggable = $('.draggable');
  if (draggable.length > 0) {
    draggable.each(function() {
      const taskId = $(this).attr('data-task-id');
      console.log(`Task ID: ${taskId}`);
    });
  } else {
    console.error('No elements with class "draggable" found');
  }
} // Closing bracket for renderTaskList function

let taskList = JSON.parse(localStorage.getItem("tasks"));

// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {
  event.preventDefault();
  const taskId = $(this).attr('data-task-id');
  taskList = taskList.filter((task) => task.id !== parseInt(taskId));
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

/**
 * Handles the drop event when a draggable item is dropped onto a target element.
 * Updates the status of the task in local storage and renders the updated task list.
 *
 * @param {Event} event - The drop event object.
 * @param {Object} ui - The jQuery UI object containing information about the draggable item.
 */
function handleDrop(event, ui) {
  event.preventDefault();
  const tasks = getTasksFromLocalStorage();
  const taskId = ui.draggable.data("task-id");
  const newStatus = event.target.id;

  const task = tasks.find(task => task.id === taskId);
  if (task) {
    task.status = newStatus;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
  } else {
    console.error(`Task with ID ${taskId} not found`);
  }
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();
  $("#taskDueDate").datepicker();

  // ? Droppable
  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });
});
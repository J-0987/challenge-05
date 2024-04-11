// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let taskTitleInput = $('#taskTitle');
let taskDueDateInput = $('#taskDueDate');
let taskDescriptionInput = $('#taskDescription');
let addTaskBtn = $('#add-task-btn');
let inProgress = $('#in-progress');
let toDoCards = $('#todo-cards');
let inProgressCard = $('#in-progress-cards');
let doneCard = $('#done-cards');



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
  const task = {
    title: taskTitleInput.val(),
    dueDate: taskDueDateInput.val(),
    description: taskDescriptionInput.val(),
    id: generateTaskId(),
    status: 'to-do'
  };

  setToLocalStorage(task);
  renderTaskCard(task);
  renderTaskList();

  // Clear inputs
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
function renderTaskCard(task) {

  const taskCard = $("<div>")
    .addClass("task-card draggable")
    .attr("data-task-id", task.id)
    .html(`
      <h3>${task.title}</h3>
      <p>Due Date: ${task.dueDate}</p>
      <p>${task.description}</p>
  `);

  return taskCard;
  // toDoCards.append(taskCard);
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  const tasks = getTasksFromLocalStorage();
  const todoList = $('#todo-cards')
  todoList.empty();
  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  for (let task of tasks) {
    console.log(task);
    if (task.status === 'to-do') {
      todoList.append(renderTaskCard(task));
    } else if (task.status === 'in-progress') {
      inProgressList.append(renderTaskCard(task));
    } else if (task.status === 'done') {
      doneList.append(renderTaskCard(task));
    }
  }


  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,

    // helper: function (e) {

    //   const original = $(e.target).hasClass('ui-draggable')
    //     ? $(e.target)
    //     : $(e.target).closest('.ui-draggable');

    //   return original.clone().css({
    //     width: original.outerWidth(),
    //   });
    // },
  })
}

// Todo: create a function to handle adding a new task


// Todo: create a function to handle deleting a task
function handleDeleteTask(event) {

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const tasks = getTasksFromLocalStorage();
  const taskId = ui.draggable.data("task-id");
  const newStatus = event.target.id;

  for (let task of tasks) {
    if (task.id === taskId) {
      task.status = newStatus;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList()

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






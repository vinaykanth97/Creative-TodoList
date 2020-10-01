const todoForm = document.querySelector(".add-todos");
const todoContainer = document.querySelector(".todos");
const todoInput = document.getElementById("todo-box");
const filterBox = document.getElementById("filter");
// Events
document.addEventListener("DOMContentLoaded", getTodos);
todoForm.addEventListener("click", addTodos);
todoContainer.addEventListener("click", checkDelete);
filterBox.addEventListener("change", filterTodos);
// AddTodos
function addTodos(e) {
  e.preventDefault();
  // Create Div
  const todoBox = document.createElement("div");
  todoBox.classList.add("todo-list");

  // Create li
  const todo = document.createElement("li");
  todo.classList.add("todo");
  todo.innerText = todoInput.value;
  todoBox.appendChild(todo);
  addStorageTodo(todoInput.value);

  // Check button
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  checkBtn.innerHTML = ` <i class="fa fa-check" aria-hidden="true"></i>`;
  todoBox.appendChild(checkBtn);

  // Trash button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("btn-trash");
  trashBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
  todoBox.appendChild(trashBtn);

  todoContainer.appendChild(todoBox);
  todoInput.value = "";
}

// Delete and check
function checkDelete(e) {
  // Check completed
  if (e.target.classList[0] === "check-btn") {
    e.target.parentElement.classList.toggle("completed");
  }

  // Delete todo
  if (e.target.classList[0] === "btn-trash") {
    e.target.parentElement.classList.add("deleted");
    DeleteTodoStorage(e.target.parentElement);
    e.target.parentElement.addEventListener("transitionend", function () {
      e.target.parentElement.remove();
    });
  }
}

// Filtering
function filterTodos(e) {
  let todos = todoContainer.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

// Storing in Local storage

function addStorageTodo(todo) {
  let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  todos.push(todo);
  localStorage.setItem("Todos", JSON.stringify(todos));
}

// Get Todos

function getTodos(todo) {
  let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  todos.forEach(function (tod) {
    // Create Div
    const todoBox = document.createElement("div");
    todoBox.classList.add("todo-list");

    // Create li
    const todo = document.createElement("li");
    todo.classList.add("todo");
    todo.innerText = tod;
    todoBox.appendChild(todo);

    // Check button
    const checkBtn = document.createElement("button");
    checkBtn.classList.add("check-btn");
    checkBtn.innerHTML = ` <i class="fa fa-check" aria-hidden="true"></i>`;
    todoBox.appendChild(checkBtn);

    // Trash button
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("btn-trash");
    trashBtn.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`;
    todoBox.appendChild(trashBtn);

    todoContainer.appendChild(todoBox);
    todoInput.value = "";
  });
}

// Delete Todos
function DeleteTodoStorage(todo) {
  let todos;
  if (localStorage.getItem("Todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("Todos"));
  }
  const todoIndex = todo.children[0].innerText;

  todos.splice(todos.indexOf(todoIndex), 1);

  localStorage.setItem("Todos", JSON.stringify(todos));
}

const newTask = document.querySelector(".btn");
const backDrop = document.querySelector(".back-drop");
const formTask = document.querySelector(".task-form");
const closeFormBtn = document.querySelector(".form-close");
const submitBtn = document.querySelector(".input--submit");
const form = document.querySelector("form");
const formStatus = document.querySelector(".task-status");

const taskInput = document.querySelectorAll(".task-form input[type='text']");

const categoryInput = taskInput[0];
const titleInput = taskInput[1];
const contentInput = taskInput[2];

let todoTask = document.querySelector("#todo .task-list");
let doingTask = document.querySelector("#doing .task-list");
let finishedTask = document.querySelector("#finished .task-list");

let todoCount = document.querySelector("#todo .task-filter .task-count");
let doingCount = document.querySelector("#doing .task-filter .task-count");
let finishedCount = document.querySelector(
  "#finished .task-filter .task-count"
);

const filters = document.querySelectorAll(".container .task");
const taskList = document.querySelectorAll(".task-list");

let editId;
let isEditedTask = false;
let tasks = JSON.parse(localStorage.getItem("task-list"));

let options = { month: "short", day: "2-digit", year: "numeric" };
const date = new Date().toLocaleDateString("en-us", options);

tasks = [
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "todo",
  },
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "doing",
  },
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "finished",
  },
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "todo",
  },
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "doing",
  },
  {
    category: "Marketing",
    title: "Write SEO article for new product",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, in quam provident commodi harum molestiae doloribus exercitationem excepturi beatae voluptatibus sapiente eligendi cumque quo? Perferendis, quisquam quis? Omnis, sunt voluptatum.",
    date: `${date}`,
    status: "finished",
  },
];

filters.forEach((e) => {
  showTask(e.id);
});

// ADD EVENT LISTENER

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addTask();
});

taskInput[2].addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

newTask.addEventListener("click", (e) => {
  openForm();
});

closeFormBtn.addEventListener("click", closeForm);
backDrop.addEventListener("click", closeForm);

// FUNCTION

// Press Enter Next Input

function tab(e) {
  if (e.which == 13) {
    e.target.nextSibling.nextSibling.focus();
    e.preventDefault();
  }
}

for (let i = 0; i < taskInput.length; i++) {
  let input = taskInput[i];
  input.onkeypress = tab;
}

// Change Border Color when input has value and hasn't value

for (let i = taskInput.length - 1; i >= 0; --i) {
  taskInput[i].addEventListener("change", adjustStyling, false);
  taskInput[i].addEventListener("blur", adjustStyling, false);
}

function adjustStyling(e) {
  let inputValue = e.target.value;
  if (inputValue) {
    e.target.classList.remove("invalid");
    submitBtn.classList.remove("invalid");
    e.target.classList.add("valid");
    submitBtn.classList.add("valid");
  } else {
    e.target.classList.remove("valid");
    submitBtn.classList.remove("valid");
    e.target.classList.add("invalid");
    submitBtn.classList.add("invalid");
  }
}

// Get Task

function getTodoTasks() {
  return tasks.filter((task) => {
    return task["status"] == "todo";
  });
}

function getDoingTasks() {
  return tasks.filter((task) => {
    return task["status"] == "doing";
  });
}

function getFinishedTasks() {
  return tasks.filter((task) => {
    return task["status"] == "finished";
  });
}

function showTask(filter) {
  let li = "";
  if (tasks) {
    tasks.forEach((todo, id) => {
      if (filter == todo.status) {
        li += `
              <li class="task-box" id="${id}">
                <h2 class="task-category">
                  <span id="${id}">${todo.category}</span>
                  <div class="task-btn">
                    <button>
                      <i class="fa-regular fa-pen-to-square task-btn--edit" onclick="editTask(${id}, '${todo.category}', '${todo.title}', '${todo.content}')"></i>
                    </button>
                    <button>
                      <i class="fa-solid fa-trash task-btn--delete" onclick="deleteTask(${id}, '${filter}')"></i>
                    </button>
                  </div>
                </h2>
                <h1 class="task-title" id="${id}">
                  ${todo.title}
                </h1>
                <p class="task-content" id="${id}">
                  ${todo.content}
                </p>
                <div class="task-time">
                  <i class="fa-regular fa-clock"></i>
                  <span class="task-time-text">${todo.date}</span>
                </div>
              </li>
      `;
      }
    });
    todoCount.innerText = getTodoTasks().length;
    doingCount.innerText = getDoingTasks().length;
    finishedCount.innerText = getFinishedTasks().length;
  }
  if (filter == "todo") {
    taskList[0].innerHTML = li;
  } else if (filter == "doing") {
    taskList[1].innerHTML = li;
  } else if (filter == "finished") {
    taskList[2].innerHTML = li;
  }
}

showTask("todo");
showTask("doing");
showTask("finished");

function addTask() {
  let category = categoryInput.value.trim();
  let title = titleInput.value.trim();
  let content = contentInput.value.trim();

  if (category && title && content) {
    if (!isEditedTask) {
      // if tasks isn't exist, pass an empty array to tasks

      let taskInfo = {
        category: category,
        title: title,
        content: content,
        date: new Date().toLocaleDateString("en-us", options),
        status: "todo",
      };
      // adding new task to tasks
      tasks.push(taskInfo);
    } else {
      isEditedTask = false;
      tasks[editId].category = category;
      tasks[editId].title = title;
      tasks[editId].content = content;
    }
    localStorage.setItem("task-list", JSON.stringify(tasks));
    showTask(document.querySelector(".task").id);
    closeForm();
  } else {
    taskInput.forEach((e) => {
      e.classList.add("invalid");
    });
    submitBtn.classList.add("invalid");
  }
}

function editTask(taskId, taskCategory, taskTitle, taskContent) {
  // if tasks status is doing or finished, set isDoing or isFinished value to checked
  let isDoing = tasks[taskId].status == "doing" ? "checked" : "";
  let isFinished = tasks[taskId].status == "finished" ? "checked" : "";
  openForm();
  formStatus.innerHTML = `
  <label for="todo" class="task-status--text">
    <input
      type="radio"
      name="status"
      value="todo"
      id="${taskId}"
      checked="true"
      onclick="updateStatus(this, '${taskId}')"
    />
    Todo
  </label>
  <label for="doing" class="task-status--text">
    <input
      type="radio"
      name="status"
      value="doing"
      id="${taskId}"
      onclick="updateStatus(this, '${taskId}')"
      ${isDoing}
    />
    Doing
  </label>
  <label for="finished" class="task-status--text">
    <input
      type="radio"
      name="status"
      value="finished"
      id="${taskId}"
      onclick="updateStatus(this, '${taskId}')"
      ${isFinished}
    />
    Finished
  </label>
  `;
  document.querySelector(".task-status").style.display = "flex";
  document.querySelector(".form-title").innerText = "Edit todo";
  editId = taskId;
  isEditedTask = true;
  categoryInput.value = taskCategory;
  titleInput.value = taskTitle;
  contentInput.value = taskContent;
}

function updateStatus(selectedTask, id) {
  if (isEditedTask) {
    // updating the status of selected task like selected value
    if (selectedTask.value == "doing") {
      tasks[id].status = selectedTask.value;
    } else if (selectedTask.value == "finished") {
      tasks[id].status = selectedTask.value;
    } else if (selectedTask.value == "todo") {
      tasks[id].status = selectedTask.value;
    }
  }
  localStorage.setItem("task-list", JSON.stringify(tasks));
  submitBtn.addEventListener("click", () => {
    showTask("todo");
    showTask("doing");
    showTask("finished");
  });
}

function deleteTask(deleteId, filter) {
  isEditedTask = false;
  // removing selected task from array/tasks
  tasks.splice(deleteId, 1);
  localStorage.setItem("task-list", JSON.stringify(tasks));
  showTask(filter);
}

function openForm() {
  document.querySelector("body").classList.add("active");
}

function closeForm() {
  document.querySelector("body").classList.remove("active");
  resetForm();
}

function resetForm() {
  isEditedTask = false;
  form.reset();
  document.querySelector(".task-status").style.display = "none";
  document.querySelector(".form-title").innerText = "Add new todo";
  taskInput.forEach((e) => {
    e.classList.remove("valid", "invalid");
  });
  submitBtn.classList.remove("valid", "invalid");
}

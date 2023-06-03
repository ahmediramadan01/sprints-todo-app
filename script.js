"use strict";

const taskName = document.querySelector(".task-name");
const taskPriority = document.querySelector("#task-priority");

const btnAdd = document.querySelector(".add");

const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

let tasks = [];

const createTable = function () {
  tableBody.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tableBody.innerHTML += `
    <tr">
        <td>${i + 1}</td>
        <td>${
          tasks[i][2]
            ? `<input id="edit-task-${i}" class="edit-task" type="text" value="${tasks[i][0]}">`
            : tasks[i][0]
        }</td>
        <td>${tasks[i][2] ? getSelect(i) : tasks[i][1]}</td>
        <td>
          <button data-id="${i}" id="edit-${i}" class="edit" onclick="editTask(${i})">Edit</button>
          <button data-id="${i}" id="save-${i}" class="save hidden" onclick="saveTask(${i})">Save</button>
          <button data-id="${i}" id="remove-${i}" class="remove" onclick="removeTask(${i})">Remove</button>
        </td>
    </tr>
    `;
  }
};
const getSelect = (i) => {
  return `<select name="priority" class="edit-priority" id="edit-priority-${i}">
  <option value="High" id="high" ${
    tasks[i][1] == "High" ? "selected" : ""
  }>High</option>
  <option value="Medium" id="medium" ${
    tasks[i][1] == "Medium" ? "selected" : ""
  }>Medium</option>
  <option value="Low" id="low" ${
    tasks[i][1] == "Low" ? "selected" : ""
  }>Low</option>
</select>`;
};
const addTask = function () {
  if (taskName.value === "") {
    openModal();
  } else {
    if (tasks.length === 0) {
      table.classList.remove("hidden");
    }
    tasks.push([taskName.value, taskPriority.value, false]);
    createTable(tasks);
    taskName.value = "";
  }
};

function removeTask(n) {
  tasks.splice(n, 1);
  createTable(tasks);
  if (tasks.length === 0) {
    table.classList.add("hidden");
  }
}

function currentTask(n) {
  return tasks[n];
}

function editTask(n) {
  tasks[n][2] = true;
  createTable(tasks);

  document.querySelector(`#save-${n}`).classList.remove("hidden");
  document.querySelector(`#edit-${n}`).classList.add("hidden");
}

function saveTask(n) {
  tasks[n][0] = document.querySelector(`#edit-task-${n}`).value;
  tasks[n][1] = document.querySelector(`#edit-priority-${n}`).value;
  tasks[n][2] = false;
  createTable(tasks);
}

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnAdd.addEventListener("click", addTask);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

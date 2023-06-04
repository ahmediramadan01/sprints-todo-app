"use strict";

const taskName = document.querySelector(".task-name");
const taskPriority = document.querySelector("#task-priority");

const addBtn = document.querySelector(".add");
const sortBtn = document.querySelector(".sort");

const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalBtn = document.querySelector(".close-modal");

let tasks = [];
let sortingPriority = ["High", "Medium", "Low"];

const renderTable = function () {
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

const getSelect = function (i) {
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
  if (taskName.value.trim() === "") {
    openModal();
  } else {
    if (tasks.length === 0) {
      table.classList.remove("hidden");
    }
    tasks.push([taskName.value, taskPriority.value, false]);
    renderTable(tasks);
    taskName.value = "";
  }
};

const removeTask = function (i) {
  tasks.splice(i, 1);
  renderTable(tasks);
  if (tasks.length === 0) {
    table.classList.add("hidden");
  }
};

const currentTask = function (i) {
  return tasks[i];
};

const editTask = function (i) {
  tasks[i][2] = true;
  renderTable(tasks);
  document.querySelector(`#save-${i}`).classList.remove("hidden");
  document.querySelector(`#edit-${i}`).classList.add("hidden");
};

const saveTask = function (i) {
  tasks[i][0] = document.querySelector(`#edit-task-${i}`).value;
  tasks[i][1] = document.querySelector(`#edit-priority-${i}`).value;
  tasks[i][2] = false;
  renderTable(tasks);
};

const sortTasks = function () {
  tasks.sort(
    (a, b) => sortingPriority.indexOf(a[1]) - sortingPriority.indexOf(b[1])
  );
  renderTable();
};

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

addBtn.addEventListener("click", addTask);
sortBtn.addEventListener("click", sortTasks);

closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

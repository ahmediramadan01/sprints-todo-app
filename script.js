"use strict";

const taskName = document.querySelector(".task-name");
const taskPriority = document.querySelector("#task-priority");

const btnAdd = document.querySelector(".add");

const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");

let tasks = [];

const createTable = function () {
  tableBody.innerHTML = "";
  for (let i = 0; i < tasks.length; i++) {
    tableBody.innerHTML += `
    <tr">
        <td>${i + 1}</td>
        <td>${tasks[i][0]}</td>
        <td>${tasks[i][1]}</td>
        <td>
        <button id="${i}" class="edit" onclick="editTask(${i})">Edit</button>
        <button id="${i}" class="remove" onclick="removeTask(${i})">Remove</button></td>
    </tr>
    `;
  }
};

const addTask = function () {
  if (taskName.value === "") {
    alert("Please enter a Task");
  } else {
    if (tasks.length === 0) {
      table.classList.remove("hidden");
    }
    tasks.push([taskName.value, taskPriority.value]);
    createTable();
    taskName.value = "";
  }
};

function editTask(n) {
  tasks[n][0] = `<input class="edit-task type="text">`;
  tasks[n][1] = `
  <select name="priority" id="edit-priority">
    <option value="High" id="high">High</option>
    <option value="Medium" id="medium">Medium</option>
    <option value="Low" id="low">Low</option>
  </select>
  `;
  createTable();
}

function removeTask(x) {
  tasks.splice(x, 1);
  createTable();
  if (tasks.length === 0) {
    table.classList.add("hidden");
  }
}

btnAdd.addEventListener("click", addTask);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

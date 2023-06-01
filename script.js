"use strict";

const taskName = document.querySelector(".task-name");
const taskPriority = document.querySelector("#task-priority");

const btnAdd = document.querySelector(".add");

const table = document.querySelector(".table");
const tableBody = document.querySelector(".table-body");

let tasks = [];

const createTable = function (tasksList) {
  tableBody.innerHTML = "";
  for (let i = 0; i < tasksList.length; i++) {
    tableBody.innerHTML += `
    <tr">
        <td>${i + 1}</td>
        <td>${tasks[i][0]}</td>
        <td>${tasks[i][1]}</td>
        <td>
          <button id="${i}" class="edit" onclick="editTask(${i})">Edit</button>
          <button id="${i}" class="save hidden" onclick="saveTask(${i})">Save</button>
          <button id="${i}" class="remove" onclick="removeTask(${i})">Remove</button>
        </td>
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
    createTable(tasks);
    taskName.value = "";
  }
};

function removeTask(x) {
  tasks.splice(x, 1);
  createTable(tasks);
  if (tasks.length === 0) {
    table.classList.add("hidden");
  }
}

// function currentTask(n) {
//   return [tasks[n][0], tasks[n][1]];
// }

function editTask(n) {
  let taskNameCopy = tasks[n][0];
  let taskPriorityCopy = tasks[n][1];
  tasks[n][0] = `<input class="edit-task type="text">`;
  tasks[n][1] = `
  <select name="priority" id="edit-priority">
    <option value="High" id="high">High</option>
    <option value="Medium" id="medium">Medium</option>
    <option value="Low" id="low">Low</option>
  </select>
  `;
  createTable(tasks);
  document.querySelector(".edit-task").value = taskNameCopy;
  document.querySelector("#edit-priority").value = taskPriorityCopy;

  document.querySelector(".edit").classList.add("hidden");
  document.querySelector(".save").classList.remove("hidden");
}

function saveTask(n) {
  if (document.querySelector(".edit-task").value !== "") {
    tasks[n][0] = document.querySelector(".edit-task").value;
    tasks[n][1] = document.querySelector("#edit-priority").value;
    createTable(tasks);
  }
}

btnAdd.addEventListener("click", addTask);

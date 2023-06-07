"use strict";

class Task {
  constructor() {
    this.taskName = document.querySelector(".task-name");
    this.taskPriority = document.querySelector("#task-priority");

    this.addBtn = document.querySelector(".add");
    this.sortBtn = document.querySelector(".sort");

    this.table = document.querySelector(".table");
    this.tableBody = document.querySelector(".table-body");

    this.modal = document.querySelector(".modal");
    this.overlay = document.querySelector(".overlay");
    this.closeModalBtn = document.querySelector(".close-modal");

    this.tasks = [];
    this.sortingPriority = ["High", "Medium", "Low"];

    this.addBtn.addEventListener("click", this.addTask.bind(this));
    this.sortBtn.addEventListener("click", this.sortTasks.bind(this));

    this.closeModalBtn.addEventListener("click", this.closeModal.bind(this));
    this.overlay.addEventListener("click", this.closeModal.bind(this));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !this.modal.classList.contains("hidden")) {
        this.closeModal();
      }
    });
  }

  renderTable() {
    this.tableBody.innerHTML = "";
    for (let i = 0; i < this.tasks.length; i++) {
      this.tableBody.innerHTML += `
      <tr">
          <td>${i + 1}</td>
          <td>${
            this.tasks[i][2]
              ? `<input id="edit-task-${i}" class="edit-task" type="text" value="${this.tasks[i][0]}">`
              : this.tasks[i][0]
          }</td>
          <td>${this.tasks[i][2] ? this.getSelect(i) : this.tasks[i][1]}</td>
          <td>
            <button data-id="${i}" id="edit-${i}" class="edit" onclick="task.editTask(${i})">Edit</button>
            <button data-id="${i}" id="save-${i}" class="save hidden" onclick="task.saveTask(${i})">Save</button>
            <button data-id="${i}" id="remove-${i}" class="remove" onclick="task.removeTask(${i})">Remove</button>
          </td>
      </tr>
      `;
    }
  }

  getSelect(i) {
    return `<select name="priority" class="edit-priority" id="edit-priority-${i}">
    <option value="High" id="high" ${
      this.tasks[i][1] == "High" ? "selected" : ""
    }>High</option>
    <option value="Medium" id="medium" ${
      this.tasks[i][1] == "Medium" ? "selected" : ""
    }>Medium</option>
    <option value="Low" id="low" ${
      this.tasks[i][1] == "Low" ? "selected" : ""
    }>Low</option>
  </select>`;
  }

  addTask() {
    if (this.taskName.value.trim() === "") {
      this.openModal();
    } else {
      if (this.tasks.length === 0) {
        this.table.classList.remove("hidden");
      }
      this.tasks.push([this.taskName.value, this.taskPriority.value, false]);
      this.renderTable();
      this.taskName.value = "";
    }
  }

  removeTask(i) {
    this.tasks.splice(i, 1);
    this.renderTable();
    if (this.tasks.length === 0) {
      this.table.classList.add("hidden");
    }
  }

  editTask(i) {
    this.tasks[i][2] = true;
    this.renderTable();
    document.querySelector(`#save-${i}`).classList.remove("hidden");
    document.querySelector(`#edit-${i}`).classList.add("hidden");
  }

  saveTask(i) {
    this.tasks[i][0] = document.querySelector(`#edit-task-${i}`).value;
    this.tasks[i][1] = document.querySelector(`#edit-priority-${i}`).value;
    this.tasks[i][2] = false;
    this.renderTable();
  }

  sortTasks() {
    this.tasks.sort(
      (a, b) =>
        this.sortingPriority.indexOf(a[1]) - this.sortingPriority.indexOf(b[1])
    );
    this.renderTable();
  }

  openModal() {
    this.modal.classList.remove("hidden");
    this.overlay.classList.remove("hidden");
  }

  closeModal() {
    this.modal.classList.add("hidden");
    this.overlay.classList.add("hidden");
  }
}

const task = new Task();

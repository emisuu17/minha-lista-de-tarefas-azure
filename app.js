const STORAGE_KEY = "my-task-list";
const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const emptyState = document.querySelector("#empty-state");
const statusText = document.querySelector("#status");
const clearButton = document.querySelector("#clear-button");

let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const label = document.createElement("span");
    const remove = document.createElement("button");

    label.textContent = task;
    remove.type = "button";
    remove.textContent = "Excluir";
    remove.setAttribute("aria-label", `Excluir tarefa: ${task}`);
    remove.addEventListener("click", () => {
      tasks.splice(index, 1);
      save();
      statusText.textContent = "Tarefa excluída.";
    });

    item.append(label, remove);
    list.append(item);
  });

  count.textContent = `${tasks.length} ${tasks.length === 1 ? "tarefa" : "tarefas"}`;
  emptyState.hidden = tasks.length > 0;
  if (tasks.length === 0) {
    statusText.textContent = "Sua lista está vazia.";
  } else {
    statusText.textContent = `${tasks.length} ${tasks.length === 1 ? "tarefa cadastrada" : "tarefas cadastradas"}.`;
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = input.value.trim();
  if (!value) return;

  tasks.push(value);
  input.value = "";
  save();
  statusText.textContent = "Tarefa adicionada.";
  input.focus();
});

clearButton.addEventListener("click", () => {
  if (tasks.length === 0) return;
  tasks = [];
  save();
  statusText.textContent = "Lista limpa.";
});

render();

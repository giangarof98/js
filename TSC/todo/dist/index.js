"use strict";
const list = document.getElementById('list');
const form = document.getElementById('task-form');
const input = document.getElementById('task-title');
const tasks = loadTask();
tasks.forEach(addListItem);
form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value == "" || input.value == null)
        return;
    const newTask = {
        title: input.value,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(newTask);
    addListItem(newTask);
    input.value = '';
});
function addListItem(task) {
    const item = document.createElement('li');
    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.addEventListener('change', () => {
        task.completed = checkbox.checked;
        saveTask();
    });
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    label.append(checkbox, task.title);
    item.append(label);
    list.append(item);
}
function saveTask() {
    localStorage.setItem('Task', JSON.stringify(tasks));
}
function loadTask() {
    const taskJSON = localStorage.getItem('Task');
    if (taskJSON == null)
        return [];
    return JSON.parse(taskJSON);
}

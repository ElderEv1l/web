document.addEventListener('DOMContentLoaded', function () {
    loadFromLocal();

    getFormFeedback();

    getButtonsFeedback();
});

function addTask(task){
    const listContainer = document.getElementById('task_list');
    const template = document.getElementById('list_item_template');
    const clone = document.importNode(template.content, true)

    clone.querySelector('span').textContent = task;
    listContainer.appendChild(clone);
}

function deleteTask(event) {
    if (event.target.dataset.action === 'delete') {
        const parentNode = event.target.closest('.list_item');
        parentNode.remove();

        saveData();
    }
}

function doneTask(event) {
    if (event.target.dataset.action === 'done') {
        const parentNode = event.target.closest('.list_item');
        const taskTitle = parentNode.querySelector('.task_title');

        taskTitle.classList.toggle('task_title--done');
        saveData();
    }
}

function getFormFeedback() {
    let form = document.getElementById('to_do_list_form')

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const task_input = document.getElementById('task_input');
            addTask(task_input.value);
            task_input.value = "";
            task_input.focus();

            saveData();
        });
    }
}

function getButtonsFeedback() {
    let listContainer = document.getElementById("task_list")

    listContainer.addEventListener('click', deleteTask)
    listContainer.addEventListener('click', doneTask)
}

function saveData() {
    let listContainer = document.getElementById("task_list")
    localStorage.setItem('data', listContainer.innerHTML)
}

function loadFromLocal() {
    let listContainer = document.getElementById("task_list")
    listContainer.innerHTML = localStorage.getItem('data')
}
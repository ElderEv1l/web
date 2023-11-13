document.addEventListener('DOMContentLoaded', function () {
    loadFromLocal();

    getFormFeedback();

    getButtonsFeedback();
});

function addTask(task){
    let listContainer = document.getElementById("task_list")
    let li = document.createElement("li")
    li.className = "list_item";

    li.innerHTML = `
        <span class="task_title">` + task + `</span>
        <div class="task_item_buttons">
            <button type="button" data-action="done" class="btn-action">
                <img src="./images/to_do_list/done.svg" alt="Done" width="18" height="18">
            </button>
    
            <button type="button" data-action="delete" class="btn-action">
                <img src="./images/to_do_list/bin.svg" alt="Delete" width="18" height="18">
            </button>
        </div>`;
    listContainer.appendChild(li);
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
    let form = document.querySelector('#to_do_list_form')

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
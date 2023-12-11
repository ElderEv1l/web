document.addEventListener('DOMContentLoaded', function () {
    loadFromLocal();

    getFormFeedback();

    getButtonsFeedback();
});

function addTask(task){
    const listContainer = document.getElementById('task_list');
    const template = document.getElementById('list_item_template');
    const clone = document.importNode(template.content, true);
    const items = listContainer.querySelectorAll('.task_title');

    let exists = false;
    items.forEach((item) => {
        if (item.textContent === task.trim()) {
            exists = true;
        }
    });

    if (task.trim() === '' || exists === true) {
        /*
            title	''	Title of the toast.
            titleColor	''	Title color.
            titleSize	''	Title fontSize.
            titleLineHeight	''	Title lineHeight.
            message	''	Message of notification.
            messageColor	''	Message color.
            messageSize	''	Message fontSize.
            messageLineHeight	''	Message lineHeight.
            backgroundColor	''	Background color of the Toast
            theme	''	It can be light or dark or set another class. Create and use like this ".iziToast-theme-name"
            color	''	It can be #hexadecimal, pre-defined themes like blue, red, green and yellow or set another class. Create and use like this ".iziToast-color-name"
            icon	''	Icon class (font-icon of your choice, Icomoon, Fontawesome etc.).
            iconText	''	Icon text (font-icon using text, Material Icons, etc.).
            iconColor	''	Icon color.
            iconUrl	null	Address of file to be loaded.
            image	''	Cover image.
            imageWidth	50	Width of cover image.
            maxWidth	null	set maxWidth of toast.
            layout	1	It can be 1 or 2, or use another layout, creating the class like this: ".iziToast-layout3"
            balloon	false	Applies a balloon like toast.
            close	true	Show "x" close button
            closeOnEscape	false	Allows to close toast using the Esc key.
            closeOnClick	false	Allows to close toast clicking on it.
            position	'bottomRight'	Where it will be shown. It can be bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter or center.
            target	''	Fixed place where you want to show the toasts.
            targetFirst	true	Add toast to first position.
            timeout	5000	Amount in milliseconds to close the toast or false to disable.
            drag	true	Drag Feature. Is used to close the toast.
            pauseOnHover	true	Pause the toast timeout while the cursor is on it.
            resetOnHover	false	Reset the toast timeout while the cursor is on it.
            progressBar	true	Enable timeout progress bar.
            progressBarColor	''	Progress bar color.
            progressBarEasing	'linear'	Animation Easing of progress bar.
            overlay	false	Enables display the Overlay layer on the page.
            overlayClose	false	Allows to close toast clicking on the Overlay.
            overlayColor	'rgba(0, 0, 0, 0.6)'	Overlay background color.
            animateInside	true	Enable animations of elements in the toast.
            buttons	{}	You can specify an array of buttons.
            inputs NEW	{}	You can specify an array of inputs.
            transitionIn	'fadeInUp'	Default toast open animation. It can be: bounceInLeft, bounceInRight, bounceInUp, bounceInDown, fadeIn, fadeInDown, fadeInUp, fadeInLeft, fadeInRight or flipInX.
            transitionOut	'fadeOut'	Default toast close animation. It can be: fadeOut, fadeOutUp, fadeOutDown, fadeOutLeft, fadeOutRight, flipOutX
            transitionInMobile	'fadeInUp'	Default toast opening mobile transition.
            transitionOutMobile	'fadeOutDown'	Default toast closing mobile transition.
            onOpening	function() {}	Callback function triggered when opening the toast.
            onOpened	function() {}	Callback function triggered when onOpened the toast.
            onClosing	function() {}	Callback function triggered when closing the toast.
            onClosed	function() {}	Callback function triggered when closed the toast.
         */
        iziToast.error({
            title: 'Error',
            message: 'Incorrect input',
            messageSize: '18',
            position: 'topRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
            animateInside: true,
            drag: false,
        });
        return;
    }

    clone.querySelector('span').textContent = task.trim();
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
    let form = document.getElementById('to_do_list_form');

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
    let listContainer = document.getElementById("task_list");

    listContainer.addEventListener('click', deleteTask);
    listContainer.addEventListener('click', doneTask);
}

function saveData() {
    let listContainer = document.getElementById("task_list");
    let items = listContainer.querySelectorAll('.task_title');

    let tasks =[];

    items.forEach((item) => {
        tasks.push({name: item.textContent, status: item.classList.contains('task_title--done')})
    });

    localStorage.setItem('data', JSON.stringify(tasks));
}

function loadFromLocal() {
    let listContainer = document.getElementById("task_list");
    listContainer.innerHTML = '';
    const template = document.getElementById('list_item_template');

    if (localStorage.getItem("data") === null) {
        localStorage.setItem('data', JSON.stringify([]));
    }

    let tasks = JSON.parse(localStorage.getItem('data'));
    tasks.forEach((task) => {
        let clone = document.importNode(template.content, true);

        clone.querySelector('span').textContent = task.name;
        if (task.status === true) {
            clone.querySelector('span').classList.toggle('task_title--done');
        }

        listContainer.appendChild(clone);
    });
}
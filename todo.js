document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const emptyImage = document.querySelector('.empty-image');
    const todosContainer = document.querySelector('todos-container');

    const toggleEmptyState = () => {
        emptyImage.style.display = taskList.children.length === 0 ? 'block' : 'none';
        todosContainer.style.width = taskList.children.length > 0 ? '100%' : '50%';
    };

    const addTask = (event) => {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        if (!taskText) {
            return;
        }

        const li = document.createElement('li');

        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <div class="task-buttons">
            <button class="edit-button"><i class="fa-solid fa-pen"></i></button>
            <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

        const checkbox = li.querySelector('.checkbox');
        const editButton = li.querySelector('.edit-button');

        
        editButton.addEventListener('click', () => {
            if (!checkbox.checked) {
                taskInput.value = li.querySelector('span').textContent;
                li.remove();
                toggleEmptyState();
            }
        })

        li.querySelector('.delete-button').addEventListener('click', () => {
            li.remove();
            toggleEmptyState();
        });
        
        taskList.appendChild(li);

        // Add checkbox click event
        checkbox.addEventListener('change', () => {
            li.classList.toggle('checked');
        });

        taskInput.value = '';
        toggleEmptyState();
    };

    addTaskBtn.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask(e);
        }
    });

    toggleEmptyState();

});


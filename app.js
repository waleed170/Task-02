
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const addTaskBtn = document.getElementById('addTaskBtn');

    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    
    const renderTasks = () => {
        taskList.innerHTML = tasks.map((task, index) => `
            <li class="${task.completed ? 'completed' : ''}">
                <input type="text" value="${task.title}" readonly class="task-title" data-index="${index}">
                <div>
                    <button class="edit-btn" data-index="${index}">✏️</button>
                    <button class="complete-btn" data-index="${index}">✔️</button>
                    <button class="delete-btn" data-index="${index}">❌</button>
                </div>
            </li>
        `).join('');
    };

    
    const addTask = () => {
        const taskTitle = taskInput.value.trim();
        if (taskTitle) {
            tasks.push({ title: taskTitle, completed: false });
            taskInput.value = '';
            updateTasks();
        }
    };

    
    taskList.addEventListener('click', (e) => {
        const index = e.target.dataset.index;
        if (e.target.classList.contains('complete-btn')) {
            toggleComplete(index);
        } else if (e.target.classList.contains('delete-btn')) {
            deleteTask(index);
        } else if (e.target.classList.contains('edit-btn')) {
            editTask(index);
        }
    });

    
    const toggleComplete = (index) => {
        tasks[index].completed = !tasks[index].completed;
        updateTasks();
    };

    
    const deleteTask = (index) => {
        tasks.splice(index, 1);
        updateTasks();
    };

    
    const editTask = (index) => {
        const taskTitle = document.querySelector(`input[data-index="${index}"]`);
        taskTitle.readOnly = false;
        taskTitle.focus();
        taskTitle.addEventListener('blur', () => {
            tasks[index].title = taskTitle.value;
            taskTitle.readOnly = true;
            updateTasks();
        });
    };

    
    const updateTasks = () => {
        renderTasks();
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    
    addTaskBtn.addEventListener('click', addTask);

    
    renderTasks();
});

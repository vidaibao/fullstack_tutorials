var todos = JSON.parse(localStorage.getItem('todos')) || [];

//DisplayTodos();


window.addEventListener('load', () => {
    //var todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createAt: new Date().getTime()
        }

        todos.push(todo);

        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();
    });

    DisplayTodos();//

});


function  DisplayTodos () {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach(todo => {
        /*
        <div class="todo-item done">
            <label>
                <input type="checkbox">
                <span class="bubble business"></span>
            </label>

            <div class="todo-content">
                <input type="text" value="Make a video" readonly>
            </div>

            <div class="actions">
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        </div>
        */
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');

        if (todo.category == 'personal') {
            span.classList.add('personal')
        } else {
            span.classList.add('business')
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        editButton.classList.add('edit');
        deleteButton.classList.add('delete');

        content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
        editButton.innerHTML = 'Edit';
        deleteButton.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todoList.appendChild(todoItem);

        if (todo.done) {
            todoItem.classList.add('done');
        }
        

        input.addEventListener('click',  e => {
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            /*
            todo.done 
            ? todoItem.classList.add('done')
            : todoItem.classList.remove('done');
            */
            todo.done && todoItem.classList.add('done');

            DisplayTodos();
        });

        editButton.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
        });

        deleteButton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        });
    });
}
const list_el = document.getElementById('list');
const create_btn_el = document.getElementById('create');

let todos = []// JSON.parse(localStorage.getItem('my_tasks')) || [];

create_btn_el.addEventListener('click', CreateNewTask);

function CreateNewTask () {
    const item = {
        id: new Date().getTime(),
        text: "",
        complete: false
    }

    todos.unshift(item);

    const { item_el, input_el }  = CreateTodoElement(item);

    list_el.prepend(item_el);

    input_el.removeAttribute('disabled');
    input_el.focus();

    // Save()


}


/*
    <div class="item complete">
        <input type="checkbox">
        <input type="text" value="Todo content goes here" disabled>
        <div class="actions">
            <button class="material-symbols-outlined">edit</button>
            <button class="material-symbols-outlined remove-btn">delete</button>
        </div>
    </div>
*/
function CreateTodoElement (item) {
    const item_el = document.createElement('div');
    item_el.classList.add('item');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = item.complete;

    if (item.complete) {
        item_el.classList.add('complete');
    }

    const input_el = document.createElement('input');
    input_el.type = 'text';
    input_el.value = item.text;
    input_el.setAttribute('disable', '');

    const action_el = document.createElement('div');
    action_el.classList.add('actions');

    const edit_btn_el = document.createElement('button');
    edit_btn_el.classList.add('material-symbols-outlined');
    edit_btn_el.innerHTML = 'edit';

    const delete_btn_el = document.createElement('button');
    delete_btn_el.classList.add('material-symbols-outlined', 'remove-btn');
    delete_btn_el.innerHTML = 'delete';

    action_el.append(edit_btn_el);
    action_el.append(delete_btn_el);

    item_el.append(checkbox);
    item_el.append(input_el);
    item_el.append(action_el);


    // EVENTs

    checkbox.addEventListener('change', () => {
        item.complete = checkbox.checked;

        if (item.complete) {
            item_el.classList.add('complete');
        } else {
            item_el.classList.remove('complete');
        }

        Save();
    });

    input_el.addEventListener('input', () => {
        item.text = input_el.value;
    });

    input_el.addEventListener('blur', () => {
        input_el.setAttribute('disabled', '') ;
        Save();
    });

    edit_btn_el.addEventListener('click', () => {
        input_el.removeAttribute('disabled');
        input_el.focus();
    });

    delete_btn_el.addEventListener('click', () => {
        todos = todos.filter(t => t.id != item.id);

        item_el.remove();

        Save();
    });

    return { item_el, input_el, edit_btn_el, delete_btn_el };


}


// Save Todos
function Save () {
    localStorage.setItem('my_tasks', JSON.stringify(todos));
}


function DisplayTasks () {
    Load();

    todos.forEach(t => {
        const {item_el} = CreateTodoElement(t);
        list_el.append(item_el);
    });
}
DisplayTasks();



function Load () {
    const data =  localStorage.getItem('my_tasks');

    if (data) {
        todos = JSON.parse(data);
    }
}

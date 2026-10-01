const Input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const List = document.getElementById('todo-list');

// Try to load saved todos from localStorage
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    // Save current todos array to localStorage
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Create a DOM node for a todo object
function createTodoNode(todo, index) {

    const li = document.createElement('li');

    // Checkbox to toggle completion
    const checkbox = document.createElement('input');

    checkbox.type = 'checkbox';
    checkbox.checked = !!todo.completed;

    checkbox.addEventListener('change', () => {

        todo.completed = checkbox.checked;

        if (todo.completed) {
            textspan.style.textDecoration = 'line-through';
        } else {
            textspan.style.textDecoration = 'none';
        }

        saveTodos();
    });

    // Text of the todo
    const textspan = document.createElement('span');

    textspan.textContent = todo.text;
    textspan.style.margin = '0 8px';

    if (todo.completed) {
        textspan.style.textDecoration = 'line-through';
    }

    // Edit Todo
    textspan.addEventListener('dblclick', () => {

        const newText = prompt('Edit Todo', todo.text);

        if (newText !== null) {
            todo.text = newText.trim();
            textspan.textContent = todo.text;
            saveTodos();
        }

    });

    // Delete Todo Button
    const delbtn = document.createElement('button');

    delbtn.textContent = 'Delete';

    delbtn.addEventListener('click', () => {

        todos.splice(index, 1);

        render();
        saveTodos();

    });

    li.appendChild(checkbox);
    li.appendChild(textspan);
    li.appendChild(delbtn);

    return li;
}

// Render the whole todo list
function render() {

    List.innerHTML = '';

    todos.forEach((todo, index) => {

        const node = createTodoNode(todo, index);

        List.appendChild(node);

    });
}

// Add Todo
function addtodo() {

    const text = Input.value.trim();

    if (!text) {
        return;
    }

    // Push a new todo object
    todos.push({
        text: text,
        completed: false
    });

    console.log(todos);

    Input.value = '';

    render();
    saveTodos();
}

addBtn.addEventListener('click', addtodo);
Input.addEventListener('keydown', (e)=>{
    if (e.key == 'Enter'){
        addtodo();
    }
})
render();
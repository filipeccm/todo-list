import flatpickr from 'flatpickr';
import { projList, storeLs } from './index';
import { addToProject } from './project';
import displayTodos from './ui-todo';

class Todo {
  constructor(title, desc, dueDate, priority) {
    this.title = title;
    this.desc = desc;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checked = false;
  }
}
//change date input to flatpickr calendar
const dueDate1 = document.getElementById('due-date');
const calendar = flatpickr(dueDate1, {
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'd-m-Y',
});

const setTodosIndex = (project) => {
  project.forEach((proj) => {
    proj.todos.forEach((todo) => {
      todo.index = proj.todos.indexOf(todo);
    });
  });
};

const addTodo = () => {
  const form = document.forms['todo-form'];
  const newTodo = new Todo(
    form.elements['title'].value,
    form.elements['description'].value,
    calendar.altInput.value,
    form.elements['priority'].value
  );
  addToProject(form.elements['project'].value, newTodo);
  displayTodos(projList);

  document.getElementById('form').reset();
};

const deleteTodo = (event) => {
  event.preventDefault();
  const li = document.getElementById(`${event.target.parentNode.id}`);
  const todoIndex = li.id;
  const projName = li.parentNode.parentNode.id;
  for (let i = 0; i < projList.length; i++) {
    if (projList[i].name === projName) {
      projList[i].todos.splice(todoIndex, 1);
    }
  }
  storeLs(projList);
  setTodosIndex(projList);
  displayTodos(projList);
};
const toggleTodo = (event) => {
  const projParent =
    event.target.parentNode.parentNode.parentNode.parentNode.id;
  const todoIndex = event.target.parentNode.parentNode.id;
  const todoStyle = event.target.parentNode.nextSibling;
  for (let i = 0; i < projList.length; i++) {
    if (projList[i].name === projParent) {
      if (projList[i].todos[todoIndex].checked === false) {
        projList[i].todos[todoIndex].checked = true;
      } else {
        projList[i].todos[todoIndex].checked = false;
        todoStyle.style.textDecoration = 'none';
      }
    }
  }
  storeLs(projList);
  displayTodos(projList);
};
const editTodo = (event) => {
  event.target.contentEditable = true;
};
const saveEdit = (event) => {
  const todoIndex = event.target.parentNode.id;
  const projParent = event.target.parentNode.parentNode.parentNode.id;
  const editedTodo = event.target;
  for (let i = 0; i < projList.length; i++) {
    if (projList[i].name === projParent) {
      projList[i].todos[todoIndex].title = editedTodo.textContent;
    }
  }
  storeLs(projList);
  displayTodos(projList);
};
const savePriority = (event) => {
  const todoIndex = event.target.parentNode.parentNode.id;
  const projParent =
    event.target.parentNode.parentNode.parentNode.parentNode.id;
  for (let i = 0; i < projList.length; i++) {
    if (projList[i].name === projParent) {
      projList[i].todos[todoIndex].priority = event.target.value;
    }
  }
  storeLs(projList);
  displayTodos(projList);
};

const editPriority = (event) => {
  const createSelect = document.createElement('select');
  event.target.textContent = '';
  event.target.appendChild(createSelect);
  let priorities = ['high', 'regular', 'low'];
  for (let i = 0; i < priorities.length; i++) {
    const createOption = document.createElement('option');
    createOption.textContent = priorities[i];
    createOption.value = priorities[i];
    createSelect.appendChild(createOption);
    createSelect.addEventListener('blur', savePriority);
  }
};

const editDate = (event) => {
  event.target.textContent = '';
  const createDateInput = document.createElement('input');

  createDateInput.className = 'flatpickr flatpickr-input';
  createDateInput.id = 'date-change';
  event.target.appendChild(createDateInput);
  const dateChange = document.getElementById('date-change');
  const newCalendar = flatpickr(dateChange, {
    altInput: true,
    altFormat: 'F j, Y',
    dateFormat: 'd-m-Y',
  });
  //save date change
  dateChange.addEventListener('change', function (event) {
    const todoIndex = event.target.parentNode.parentNode.id;
    const projParent =
      event.target.parentNode.parentNode.parentNode.parentNode.id;
    for (let i = 0; i < projList.length; i++) {
      if (projList[i].name === projParent) {
        projList[i].todos[todoIndex].dueDate = newCalendar.altInput.value;
      }
    }
    storeLs(projList);
    displayTodos(projList);
  });
};

export {
  Todo,
  addTodo,
  deleteTodo,
  toggleTodo,
  setTodosIndex,
  editTodo,
  saveEdit,
  editPriority,
  editDate,
};

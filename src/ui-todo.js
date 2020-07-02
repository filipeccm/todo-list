import {
  deleteTodo,
  toggleTodo,
  editTodo,
  saveEdit,
  editPriority,
  editDate,
} from './todo';

const displayDescription = (event) => {
  const content = event.target.nextSibling;
  if (content.style.maxHeight) {
    content.style.maxHeight = null;
    event.target.className = 'fas fa-chevron-down';
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
    event.target.className = 'fas fa-chevron-up';
  }
};

const displayTodos = (project) => {
  for (let i = 0; i < project.length; i++) {
    const ul = document.getElementById(`${project[i].name} ul`);
    ul.querySelectorAll('li').forEach((l) => l.remove());
    project[i].todos.forEach((todo) => {
      const createLi = document.createElement('li');
      const createLabel = document.createElement('label');
      const createInput = document.createElement('input');
      const createCheckSpan = document.createElement('span');
      const createSpan = document.createElement('span');
      const createSpan2 = document.createElement('span');
      const createSpan3 = document.createElement('span');
      const createBtn = document.createElement('i');
      const createBtn2 = document.createElement('i');
      const createDiv = document.createElement('div');
      const createP = document.createElement('p');

      ul.appendChild(createLi);
      createLi.appendChild(createLabel);
      createLabel.className = 'checkbox';
      createLabel.appendChild(createInput);
      createInput.type = 'checkbox';
      createLabel.appendChild(createCheckSpan);
      if (todo.checked === false) {
        createInput.checked = false;
        createSpan.style.textDecoration = 'none';
      } else {
        createInput.checked = true;
        createSpan.style.textDecoration = 'line-through';
      }

      createInput.addEventListener('change', toggleTodo);
      createLi.appendChild(createSpan);
      createLi.appendChild(createSpan2);
      createLi.appendChild(createSpan3);
      createLi.appendChild(createBtn);
      createLi.appendChild(createBtn2);
      createLi.appendChild(createDiv);
      createDiv.appendChild(createP);

      createLi.id = todo.index;
      createSpan.textContent = `${todo.title}`;
      createSpan.className = 'todo-title';
      createSpan.addEventListener('click', editTodo);
      createSpan.addEventListener('focusout', saveEdit);
      createSpan2.textContent = `${todo.dueDate}`;
      createSpan2.className = 'todo-date';
      createSpan2.addEventListener('dblclick', editDate);
      createSpan3.textContent = `${todo.priority}`;
      if (todo.priority === 'high') {
        createSpan3.className = 'priority high';
      } else if (todo.priority === 'regular') {
        createSpan3.className = 'priority regular';
      } else {
        createSpan3.className = 'priority low';
      }
      createSpan3.addEventListener('dblclick', editPriority);
      createBtn.className = 'clickable far fa-trash-alt';
      createBtn.addEventListener('click', deleteTodo);
      createBtn2.className = 'clickable fas fa-chevron-down';
      createBtn2.addEventListener('click', displayDescription);
      createDiv.className = 'description-container hidden';
      createP.textContent = `${todo.desc}`;
    });
  }
};

export default displayTodos;

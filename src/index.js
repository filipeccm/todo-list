import { addTodo } from './todo';
import { Project, addProject, deleteProject, projects } from './project';
import { doesNotMatch } from 'assert';
import { displayProjs, displayOptions } from './ui-project';
import displayTodos from './ui-todo';

let projList = [];

const recoverProjects = (list) => {
  projList = list;
};

const storeLs = (actualList) => {
  localStorage.setItem('PROJECTS', JSON.stringify(actualList));
};

const initApp = (() => {
  const projectsLs = JSON.parse(localStorage.getItem('PROJECTS')); //obj
  if (projectsLs === null) {
    const projDefault = new Project('default');
    //temporary array
    const prjs = [];
    prjs.push(projDefault);
    recoverProjects(prjs);
    storeLs(prjs);
    displayProjs(prjs);
    displayOptions(prjs);
  } else {
    recoverProjects(projectsLs);
    displayProjs(projList);
    displayTodos(projList);
    displayOptions(projList);
  }
})();

const addBtn = document.getElementById('add-btn');
addBtn.addEventListener('click', addTodo);

const projBtn = document.getElementById('new-proj');
projBtn.addEventListener('click', addProject);

export { projList, storeLs };

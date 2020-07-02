import { deleteProject } from './project';

const displayProjs = (projects) => {
  const list = document.getElementById('list');
  //clean before adding new ones
  list.querySelectorAll('div').forEach((div) => div.remove());
  for (let i = 0; i < projects.length; i++) {
    const createDiv = document.createElement('div');
    const createDiv2 = document.createElement('div');
    const createH2 = document.createElement('h2');
    const createIcon = document.createElement('i');
    const createUl = document.createElement('ul');
    list.appendChild(createDiv);
    createDiv.className = 'project-div';
    createDiv.id = projects[i].name;
    createDiv.appendChild(createDiv2);
    createDiv2.className = 'project-header';
    createDiv2.appendChild(createH2);
    createH2.textContent = projects[i].name;
    createDiv2.appendChild(createIcon);
    createIcon.className = 'clickable far fa-trash-alt';
    createIcon.addEventListener('click', deleteProject);

    createDiv.appendChild(createUl);
    createUl.className = 'project-ul';
    createUl.id = `${projects[i].name} ul`;
  }
};

const displayOptions = (list) => {
  const projSelect = document.getElementById('project');
  projSelect.querySelectorAll('option').forEach((op) => op.remove());
  list.forEach((project) => {
    const addOption = document.createElement('option');
    projSelect.appendChild(addOption);
    addOption.append(document.createTextNode(project.name));
    addOption.value = project.name;
  });
};

export { displayProjs, displayOptions };

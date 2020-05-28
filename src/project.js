import {projList, storeLs} from "./index"
import {setTodosIndex} from "./todo"
import {displayProjs, displayOptions} from "./ui-project"
import displayTodos from "./ui-todo";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }
}

const addProject = () => {
  const projForm = document.forms['proj-form'];
  const projName = projForm.elements['project'].value;
  let newProj = new Project(projName)
  projList.push(newProj) //add to array
  storeLs(projList); //add to local storage
  displayProjs(projList);
  displayTodos(projList);
  displayOptions(projList);
  document.getElementById('project-form').reset();
}

function addToProject(name, todo) {
  for (let i = 0; i < projList.length; i++) {
    if (projList[i].name ===  name) {
      projList[i].todos.push(todo);
    }
  }
  setTodosIndex(projList);
  storeLs(projList)
}
export {Project, addToProject, addProject}
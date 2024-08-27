


import './styles.css';

const todoContent = document.querySelector('.todo-content');
const projectContent = document.querySelector(".project-content");

let projects = [];

let firstDiv;
let secondDiv;


function Project(title) {

  this.title = title;
  this.todos = [];  // I will put the todos object here.
}

function Todo(name) {

  this.name = name;

}

function createButton() {
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = "add new project";

  projectContent.appendChild(button);

  button.addEventListener('click', pushProject);
}

function pushProject() {
  const projectName = prompt("title of the project:");

  const newProject = new Project(projectName);

  projects.push(newProject);
  console.log(projects.length); // ova mi e da proveram neso u konzola.
  displayProjects();
}

function createProjectDiv() {
  const projectHolderDiv = document.createElement('div');
  projectHolderDiv.className = 'project-holder-div';

  projectContent.appendChild(projectHolderDiv);
  firstDiv = projectHolderDiv;
}

function createTodoDiv() {
  const todoHolderDiv = document.createElement('div');
  todoHolderDiv.className = 'todo-holder-div';

  todoContent.appendChild(todoHolderDiv);
  secondDiv = todoHolderDiv;
}

function createAddTodoButton() {
  const addButton = document.createElement('button');
    addButton.textContent = '+';

    todoContent.appendChild(addButton);
    return addButton;
}

function displayProjects() {

  firstDiv.innerHTML = '';

  // 1. Znaci prvo za sekoj Proekt vo array-to, sozdavame div.
  projects.forEach(project => {

    const projectDiv = document.createElement('div');

    projectDiv.className = 'project-divs';
    projectDiv.textContent = project.title;


    firstDiv.appendChild(projectDiv);

    // 2. Posle za sekoj proekt ako se klikne na nego, se sozdava addButton. Tuka bi trebalo da dodadam if/else logic, za ako nema nisto vo array-ot, da se aktivira SAMO 3-ot chekor(pravanje na "+" kopce. No, AKO ima vekje todos vo array-ot, togas da se displejnat PLUS da se dodade uste edno kopce, koe sto ke dodava drugi todos.)
    projectDiv.addEventListener('click', function() {

      secondDiv.innerHTML = '';

      const children = todoContent.children;

      // clearing the "+" buttons.
      for (let i = children.length - 1; i >= 0; i--) {
        if (children[i].textContent === '+') {
          children[i].remove();
          console.log('WORKS');
        }
      };


      if (project.todos.length != 0) {
        project.todos.forEach(todo => {

          const todoDiv = document.createElement('div'); // Kreiranje na todo div.
  
          todoDiv.className = "todo-divs";
          todoDiv.textContent = todo.name;
  
          secondDiv.appendChild(todoDiv);
          console.log(project.todos.length); // test

        });
      } 

      const addButton = createAddTodoButton();

      // 3. Ako se klikne addButton-ot, se sozdava objekt Todo, i go dodavame vo array-ot na momentalniot project koj sto sme go kliknale.
      addButton.addEventListener('click', function() {
        const nameForTodo = prompt('The name of the todo-list: ');

        secondDiv.innerHTML = '';

        const toDoList = new Todo(nameForTodo);
        project.todos.push(toDoList);

        
        // posle dodavanjeto na todo list, treba vednas da se displejne vo secondDiv sve. Tuka treba pak forEach() valjda.
        project.todos.forEach(todo => {


          const todoDiv = document.createElement('div'); // Kreiranje na todo div.
  
          todoDiv.className = "todo-divs";
          todoDiv.textContent = todo.name;

          secondDiv.appendChild(todoDiv);
          console.log('PALI'); // test


        });

      })
    });
  })
}

createButton();
createProjectDiv();
createTodoDiv();

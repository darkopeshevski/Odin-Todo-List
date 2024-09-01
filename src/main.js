


import './styles.css';

const todoContent = document.querySelector('.todo-content');
const projectContent = document.querySelector(".project-content");
const content = document.querySelector('.content')

let projects = [];

let firstDiv;
let secondDiv;


function Project(title) {

  this.title = title;
  this.todos = [];  // I will put the todo objects here.
};

function Todo(title, description, dueDate, priority) {

  this.title = title;
  this.description = description;
  this.dueDate = dueDate;
  this.priority = priority;

};

function displayTodos(temporaryProject, secondDiv) {
  temporaryProject.todos.forEach(todo => {

    const todoDiv = document.createElement('div'); // Kreiranje na todo div.

    const todoTitle = document.createElement('p');
    const todoDescr = document.createElement('div');
    const todoDueDate = document.createElement('div');
    const todoPriority = document.createElement('div');

    todoTitle.textContent = todo.title;
    todoTitle.className = 'todo-title';

    todoDescr.textContent = todo.description;
    todoDescr.className = 'todo-description';

    todoDueDate.textContent = todo.dueDate;
    todoDueDate.className = 'todo-duedate';

    todoPriority.textContent = todo.priority;
    todoPriority.className = 'todo-priority';

    todoDiv.className = "todo-divs";
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(todoDescr);
    todoDiv.appendChild(todoDueDate);
    todoDiv.appendChild(todoPriority);

    secondDiv.appendChild(todoDiv);
    console.log('PALI'); // test
  });
}

function createTodoModal() {
  const modal = document.createElement('dialog');

  const modalContent = document.createElement('div'); // div contentot, vo nego sve ke stavame.
  const modalTitle = document.createElement('input');
  const modalDescription = document.createElement('input');
  const modalDate = document.createElement('input');
  const modalPriority = document.createElement('select');
  const confirmButton =  document.createElement('button');

  const optionOne = document.createElement('option');
  const optionTwo = document.createElement('option');

  optionOne.value = 'low';
  optionOne.textContent = 'low';
  optionTwo.value = 'high';
  optionTwo.textContent = 'high';

  modalTitle.type = 'text';
  modalTitle.className = 'modal-title';
  modalTitle.placeholder = 'Title';

  modalDescription.type = 'text';
  modalDescription.className = 'modal-description';
  modalDescription.placeholder = 'Description';

  confirmButton.className = 'modal-button';
  confirmButton.textContent = 'confirm';

  modalDate.type = 'date';
  modalDate.className = 'modal-date';

  modalPriority.className = 'modal-priority';
  modalPriority.placeholder = 'Priority';
  modalPriority.appendChild(optionOne);
  modalPriority.appendChild(optionTwo);


  modalContent.appendChild(modalTitle);
  modalContent.appendChild(modalDescription);
  modalContent.appendChild(modalDate);
  modalContent.appendChild(modalPriority);
  modalContent.appendChild(confirmButton);

  modal.appendChild(modalContent);

  content.appendChild(modal);
  modal.showModal();

  return {
    modal,
    modalContent,
    modalTitle,
    modalDescription,
    modalDate,
    modalPriority,
    confirmButton
  };

}

function createProjectModal() {
  const modal = document.createElement('dialog');

  const modalContent = document.createElement('div'); // div contentot, vo nego sve ke stavame.
  const modalTitle = document.createElement('input');
  const confirmButton = document.createElement('button');

  modalTitle.type = 'text';
  modalTitle.className = 'modal-project-title';
  modalTitle.placeholder = 'Title';
  
  confirmButton.className = 'modal-project-button';
  confirmButton.textContent = 'confirm';


  modalContent.appendChild(modalTitle);
  modalContent.appendChild(confirmButton);

  modal.appendChild(modalContent);
  content.appendChild(modal);
  modal.showModal();

  return {
    modal,
    modalContent,
    modalTitle,
    confirmButton
  };

}

function createButton() {
  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = "add new project";

  projectContent.appendChild(button);

  button.addEventListener('click', pushProject);
}

function pushProject() {
  const newProjectModal = createProjectModal();

  newProjectModal.confirmButton.addEventListener('click', function() {

    const newProject = new Project(newProjectModal.modalTitle.value);

    projects.push(newProject);
    console.log(projects.length); // ova mi e da proveram neso u konzola.
    displayProjects();
    newProjectModal.modal.close();
  })
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
        }
      };

      // Displaying the todos if they exist for the clicked project.
      if (project.todos.length != 0) {

        displayTodos(project, secondDiv);
      };



      const addButton = createAddTodoButton();

      // 3. Ako se klikne addButton-ot, se sozdava objekt Todo, i go dodavame vo array-ot na momentalniot project koj sto sme go kliknale.
      addButton.addEventListener('click', function() {

        const newModal = createTodoModal();

        newModal.confirmButton.addEventListener('click', function() {

          secondDiv.innerHTML = '';

          const toDoList = new Todo(newModal.modalTitle.value, newModal.modalDescription.value, newModal.modalDate.value, newModal.modalPriority.value);
          project.todos.push(toDoList);

          displayTodos(project, secondDiv);
          
          newModal.modal.close();
        })
      })
    });
  })
}

createButton();
createProjectDiv();
createTodoDiv();

// Sélectionnez les éléments HTML
const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");
const taskDetailsModal = document.getElementById("task-details-modal");
const editTaskModal = document.getElementById("edit-task-modal");

// Tableau pour stocker les tâches

let tasks = [];

// Écouter l'événement de soumission du formulaire

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("task-title").value;
  const description = document.getElementById("task-description").value;
  const deadline = document.getElementById("task-deadline").value;
  const priority = document.getElementById("task-priority").value;

  // Créer une nouvelle tâche
  const newTask = {
    title,
    description,
    deadline,
    priority,
    completed: false,
  };

  // Ajouter la tâche au tableau
  tasks.push(newTask);

  // Réinitialiser le formulaire
  taskForm.reset();

  // Mettre à jour l'affichage de la liste des tâches
  displayTasks();
});

// Afficher les tâches dans la liste

function displayTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Deadline: ${task.deadline}</p>
      <p>Priorité: ${task.priority}</p>
      <button class="view-details" data-index="${index}">Voir Détails</button>
      <button class="edit-task" data-index="${index}">Modifier</button>
      <button class="delete-task" data-index="${index}">Supprimer</button>
    `;

    taskList.appendChild(taskItem);

    // Écouter les événements pour chaque bouton

    const viewDetailsBtn = taskItem.querySelector(".view-details");
    const editTaskBtn = taskItem.querySelector(".edit-task");
    const deleteTaskBtn = taskItem.querySelector(".delete-task");

    viewDetailsBtn.addEventListener("click", () => showTaskDetails(index));
    editTaskBtn.addEventListener("click", () => editTask(index));
    deleteTaskBtn.addEventListener("click", () => deleteTask(index));
  });
}

// Afficher les détails de la tâche sélectionnée

function showTaskDetails(index) {
  const task = tasks[index];

  // Mettre à jour le contenu du modal
  taskDetailsModal.innerHTML = `
    <h2>${task.title}</h2>
    <p>Description: ${task.description}</p>
    <p>Deadline: ${task.deadline}</p>
    <p>Priorité: ${task.priority}</p>
    <p>État d'Avancement: ${task.completed ? "Terminée" : "En cours"}</p>
  `;

  // Afficher le modal
  taskDetailsModal.style.display = "block";
}


// Modifier une tâche

function editTask(index) {
    const task = tasks[index];
  
    // Mettre à jour le formulaire de modification avec les détails de la tâche

    const editTaskForm = document.createElement("form");
    editTaskForm.innerHTML = `
      <h2>Modifier la Tâche</h2>
      <input type="text" id="edit-task-title" placeholder="Titre" value="${task.title}" required>
      <textarea id="edit-task-description" placeholder="Description">${task.description}</textarea>
      <input type="date" id="edit-task-deadline" value="${task.deadline}" required>
      <select id="edit-task-priority">
          <option value="faible">Faible</option>
          <option value="moyenne">Moyenne</option>
          <option value="forte">Forte</option>
      </select>
      <button type="submit">Enregistrer</button>
    `;
  
    // Remplacer le contenu du modal de modification par le formulaire de modification
    editTaskModal.innerHTML = '';
    editTaskModal.appendChild(editTaskForm);
  
    // Écouter l'événement de soumission du formulaire de modification
    editTaskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // Mettre à jour les détails de la tâche

      task.title = document.getElementById("edit-task-title").value;
      task.description = document.getElementById("edit-task-description").value;
      task.deadline = document.getElementById("edit-task-deadline").value;
      task.priority = document.getElementById("edit-task-priority").value;
  
      // Fermer le modal de modification

      editTaskModal.style.display = "none";
  
      // Mettre à jour l'affichage de la liste des tâches

      displayTasks();
    });
  
    // Afficher le modal de modification

    editTaskModal.style.display = "block";
  }
  

  
  // Afficher le modal de modification
  editTaskModal.style.display = "block";


// Supprimer une tâche


function deleteTask(index) {
  tasks.splice(index, 1);
  displayTasks();
}

// Initialisation de  l'application en affichant les tâches existantes 
displayTasks();
console.log(displayTasks)
'use strict'

export function userInterface(controller){
    function renderProjects(){
        const projectArray = controller.returnProjectArray();
        const currentProject = controller.getCurrentProject();
        projectList.innerHTML = "";
        
        projectArray.forEach((project) => {
            const li = document.createElement("li");
            li.textContent = project.name;
            
            li.dataset.id = project.id;
            
            if (project.id === currentProject.id){
                li.classList.add("active-project");
            }
            projectList.appendChild(li);
        });
        renderProjectTitleAndDescription(currentProject);
        renderProjectTodo(currentProject);
    }


    function renderProjectTitleAndDescription(currentProject){
        const title = document.querySelector(".main-content-title h2");
        title.textContent = currentProject.name;
        const description = document.querySelector(".project-description");
        description.textContent = currentProject.description;
    }


    function renderProjectTodo(){
        const currentProject = controller.getCurrentProject();
        const mainContentCardContainer = document.querySelector(".main-content-card-container");
        mainContentCardContainer.innerHTML = "";

        const todoList = currentProject.readTodo();

        for (let todo of todoList){
            const mainContentCard = document.createElement("div");
            mainContentCard.classList.add("main-content-card");
            
            const todoCheckboxDiv = document.createElement("div");
            todoCheckboxDiv.classList.add("todo-checkbox");
            const inputCheckbox = document.createElement("input");
            inputCheckbox.type = "checkbox";
            inputCheckbox.addEventListener("change", () => {
                todo.changeStatus();
                renderProjectTodo();
            });
            inputCheckbox.checked = todo.checked;
            if (inputCheckbox.checked){
                mainContentCard.classList.add("strikethrough");
            }
            todoCheckboxDiv.appendChild(inputCheckbox);
            

            const todoTitleDiv = document.createElement("div");
            todoTitleDiv.classList.add("todo-title");
            todoTitleDiv.textContent = todo.name;

            const todoDateDiv = document.createElement("div");
            todoDateDiv.classList.add("todo-date");
            todoDateDiv.textContent = todo.dueDate;

            const todoPriorityDiv = document.createElement("div");
            todoPriorityDiv.classList.add("todo-priority");
            console.log(todo.priority);
            switch(todo.priority){
                case "high":
                    todoPriorityDiv.classList.add("priority-high");
                    todoPriorityDiv.classList.remove("priority-medium", "priority-low");
                    break; 
                case "medium":
                    todoPriorityDiv.classList.add("priority-medium");
                    todoPriorityDiv.classList.remove("priority-high", "priority-low");
                    break;
                case "low":
                    todoPriorityDiv.classList.add("priority-low");
                    todoPriorityDiv.classList.remove("priority-medium", "priority-high");
                    break;
            };

            const todoEditDiv = document.createElement("div");
            todoEditDiv.classList.add("todo-edit");
            todoEditDiv.innerHTML = '<svg width="16px" height="16px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="m3.99 16.854-1.314 3.504a.75.75 0 0 0 .966.965l3.503-1.314a3 3 0 0 0 1.068-.687L18.36 9.175s-.354-1.061-1.414-2.122c-1.06-1.06-2.122-1.414-2.122-1.414L4.677 15.786a3 3 0 0 0-.687 1.068zm12.249-12.63 1.383-1.383c.248-.248.579-.406.925-.348.487.08 1.232.322 1.934 1.025.703.703.945 1.447 1.025 1.934.058.346-.1.677-.348.925L19.774 7.76s-.353-1.06-1.414-2.12c-1.06-1.062-2.121-1.415-2.121-1.415z" fill="currentColor"></path></g></svg>'
            todoEditDiv.addEventListener("click", () => {
                const dialogBox = document.querySelector(".todo-dialog");
                const form = document.querySelector(".todo-form");
                const cancelButton = document.querySelector(".dialog-cancel-todo");
                dialogBox.showModal();
                cancelButton.onclick = () => dialogBox.close();

                form.onsubmit = (e) => {
                    e.preventDefault();

                    const newName = document.querySelector("#dialog-todo-title").value;
                    const newDescription = document.querySelector("#dialog-todo-description").value;
                    const newDate = document.querySelector("#dialog-todo-date").value;
                    const newPriority = document.querySelector("#dialog-todo-priority").value;
                    
                    todo.changeName(newName);
                    todo.changeDescription(newDescription);
                    todo.changeDueDate(newDate);
                    todo.changePriority(newPriority);

                    form.reset();
                    dialogBox.close();
                    renderProjects();
                }
            })

            const todoDeleteDiv = document.createElement("div");
            todoDeleteDiv.classList.add("todo-delete");
            todoDeleteDiv.innerHTML = '<svg fill="currentColor" width="16px" height="16px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" stroke="currentColor"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M5.755,20.283,4,8H20L18.245,20.283A2,2,0,0,1,16.265,22H7.735A2,2,0,0,1,5.755,20.283ZM21,4H16V3a1,1,0,0,0-1-1H9A1,1,0,0,0,8,3V4H3A1,1,0,0,0,3,6H21a1,1,0,0,0,0-2Z"></path></g></svg>';
            todoDeleteDiv.addEventListener("click", () => {
                currentProject.deleteTodo(todo.id);
                renderProjectTodo();
            })

            const todoDescriptionDiv = document.createElement("div");
            todoDescriptionDiv.classList.add("todo-description");
            const todoDescription = document.createElement("p");
            todoDescription.textContent = "- " + todo.description;
            todoDescriptionDiv.appendChild(todoDescription);

            mainContentCard.append(todoCheckboxDiv, todoTitleDiv, todoDateDiv, todoPriorityDiv, todoEditDiv, todoDeleteDiv, todoDescriptionDiv);
            mainContentCardContainer.appendChild(mainContentCard);
        }
    }

    const projectList = document.querySelector(".project-list ul");
    projectList.addEventListener("click", (e) => {
        const clickedLi = e.target.closest("li" );
        if (!clickedLi){
            return;
        }
        const id = clickedLi.dataset.id;

        controller.setCurrentProjectId(id);
        renderProjects();
    });

    let isEditing = false;
    const editProjectButton = document.querySelector(".edit-project");
    const deleteProjectButton = document.querySelector(".delete-project");
    editProjectButton.addEventListener("click", () => {
        const editProjectDialog = document.querySelector(".project-dialog");
        const cancelButton = document.querySelector(".dialog-cancel-project");
        const form = document.querySelector(".project-form");
        isEditing = true;
        editProjectDialog.showModal();

        cancelButton.onclick = () => editProjectDialog.close();

        form.onsubmit = (e) => {
            e.preventDefault();

            const title = document.querySelector("#dialog-project-title").value;
            const description = document.querySelector("#dialog-project-description").value;
            const currentProject = controller.getCurrentProject();
            const projectArray = controller.returnProjectArray();
            for (let i = 0; i <= 3; i++){
                if (projectArray[i].id === currentProject.id){
                    alert("Can't edit default projects");
                    editProjectDialog.close();
                    return;
                }
            };
            if (isEditing) {
                currentProject.changeName(title);
                currentProject.changeDescription(description);
            } else {
                controller.addProject(title, description);
            }
            isEditing = false;
            form.reset();
            editProjectDialog.close();
            renderProjects();
        };
    });

    deleteProjectButton.addEventListener("click", () => {
        const currentProject = controller.getCurrentProject();
        const projectArray = controller.returnProjectArray();
        for (let i = 0; i <= 3; i++){
            if (projectArray[i].id === currentProject.id){
                alert("Can't delete default projects");
                return;
            }
        };
        controller.deleteProject(currentProject.id);
        renderProjects();
    });

    function addProjectDialog(){
        const projectDialog = document.querySelector(".project-dialog");
        const cancelButton = document.querySelector(".dialog-cancel-project");
        const form = document.querySelector(".project-form");
        projectDialog.showModal();
        
        
        cancelButton.onclick = () => projectDialog.close();

        form.onsubmit = (e) => {
            e.preventDefault();

            const title = document.querySelector("#dialog-project-title").value;
            const description = document.querySelector("#dialog-project-description").value;

            controller.addProject(title, description);

            form.reset();
            projectDialog.close();

            renderProjects();
        };
    }

    function addTodoDialog(){
        const todoDialog = document.querySelector(".todo-dialog");
        const cancelButton = document.querySelector(".dialog-cancel-todo");
        const form = document.querySelector(".todo-form");
        const currentProject = controller.getCurrentProject();

        todoDialog.showModal();
        cancelButton.onclick = () => todoDialog.close();

        form.onsubmit = (e) => {
            e.preventDefault();

            const title = document.querySelector("#dialog-todo-title").value;
            const description = document.querySelector("#dialog-todo-description").value;
            const dueDate = document.querySelector("#dialog-todo-date").value;
            const priority = document.querySelector("#dialog-todo-priority").value;

            currentProject.addTodo(title, description, dueDate, priority);

            form.reset()
            todoDialog.close();
            renderProjectTodo();
        }
    }

    const addProjectButton = document.querySelector(".add-project-button");
    addProjectButton.addEventListener("click", addProjectDialog);

    const addTodoButton = document.querySelector(".add-todo-button");
    addTodoButton.addEventListener("click", addTodoDialog);
    
    renderProjects();
}



// 3) Check out date fns to better store date
// 4) Make edit button work on todos
// 5) Make delete button work on todos
// 6) On clicking the checkbox, a strikethrough should appear for checked projects.
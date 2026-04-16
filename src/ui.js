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


    function renderProjectTodo(currentProject){
        
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
        let flag = true;
        for (let i = 0; i <= 3; i++){
            if (projectArray[i].id === currentProject.id){
                alert("Can't delete default projects");
                return;
            }
        };
        controller.deleteProject(currentProject.id);
        renderProjects();
    })



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

            const title = document.querySelector(".dialog-todo-title").value;
            const description = document.querySelector(".dialog-todo-description").value;
            const dueDate = document.querySelector(".dialog-todo-date").value;
            const priority = document.querySelector(".dialog-todo-priority");

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



// 2) Make todos appear dynamically
// 3) Check out date fns to better store date
// 4) Make edit button work on todos
// 5) Make delete button work on todos
// 6) On clicking the checkbox, a strikethrough should appear for checked projects.
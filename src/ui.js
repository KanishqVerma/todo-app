'use strict'

export function userInterface(controller){
    const projectList = document.querySelector(".project-list ul");
    
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


    projectList.addEventListener("click", (e) => {
        const clickedLi = e.target.closest("li" );
        if (!clickedLi){
            return;
        }
        const id = clickedLi.dataset.id;

        controller.setCurrentProjectId(id);
        renderProjects();
    });



    function addProjectDialog(){
        const projectDialog = document.querySelector(".project-dialog");
        const cancelButton = document.querySelector(".dialog-cancel-project");
        const form = document.querySelector(".project-form");
        projectDialog.showModal();
        
        
        cancelButton.onclick = () => projectDialog.close();

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.querySelector("#dialog-project-title").value;
            const description = document.querySelector("#dialog-project-description").value;

            controller.addProject(title, description);

            form.reset();
            projectDialog.close();


            renderProjects();
        });
    }

    const addProjectButton = document.querySelector(".add-project-button");
    addProjectButton.addEventListener("click", addProjectDialog);
    
    renderProjects();
}
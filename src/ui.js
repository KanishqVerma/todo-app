'use strict'

export function userInterface(controller){
    function renderProjects(){
        const projectArray = controller.returnProjectArray();

    }

    function addProjectDialog(){
        const projectDialog = document.querySelector(".project-dialog");
        projectDialog.showModal();
        
        const cancelButton = document.querySelector(".dialog-cancel-project");
        cancelButton.addEventListener("click", () => {
            projectDialog.close();
        });

        const form = document.querySelector(".project-form");
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.querySelector("#dialog-project-title").value;
            const description = document.querySelector("#dialog-project-description").value;

            console.log("Project: ", title, description);
            form.reset();
            projectDialog.close();
        });

    }

    const addProjectButton = document.querySelector(".add-project-button");
    addProjectButton.addEventListener("click", addProjectDialog);
}

userInterface();
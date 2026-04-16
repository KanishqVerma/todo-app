'use strict'

class Project{
    constructor(name, description){
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
    }

    #todoArray = [];

    changeName(name){
        this.name = name;
    }

    changeDescription(description){
        this.description = description;
    }

    addTodo(todoTitle, todoDescription, todoDueDate, todoPriority) {
        this.#todoArray.push(new ToDo(todoTitle, todoDescription, todoDueDate, todoPriority));
    }

    deleteTodo(id) {
        this.#todoArray = this.#todoArray.filter((todoItem) => {
            return todoItem.id !== id;
        });
    }

    readTodo() {
        return [...this.#todoArray];
    }
}

class ToDo{
    constructor(name, description, dueDate, priority){
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checked = false;
    }

    changeName(newName) {
        this.name = newName;
    }

    changeDescription(newDescription){
        this.description = newDescription;
    }

    changeDueDate(newDueDate){
        this.dueDate = newDueDate;
    }

    changePriority(newPriority){
        this.priority = newPriority;
    }

    changeStatus(){
        this.checked = !this.checked;
    }
}

export function todoController(){
    const projectArray = [];
    const defaultProjectId = [];

    const addProject = function(projectName, projectDescription){
        projectArray.push(new Project(projectName, projectDescription));
    };

    const returnProjectArray = function(){
        return projectArray.slice();
    }

    const readProject = function(){
        return [...projectArray];
    };
    
    const deleteProject = function(deleteId){
        const index = projectArray.findIndex((project) => project.id === deleteId);
        
        if (index === -1){
            return;
        }

        if (defaultProjectId.includes(deleteId)){
            throw("Attempt to delete a default project");
        }

        projectArray.splice(index, 1);
        if (deleteId === currentProjectId && projectArray.length !== 0){
            setCurrentProjectId(projectArray[0].id);
        }
    };

    const getCurrentProject = function(){
        const index = projectArray.findIndex((project) => project.id === currentProjectId);
        
        if (index !== -1){
            return projectArray[index];
        } else throw("-1 index at getCurrentProject")
    }

    const getTodoFromCurrentProject = function(){
        const currentProject = getCurrentProject();
        for (let todo of currentProject){
            console.log(todo);
        }
    }

    const setCurrentProjectId = function(id){
        currentProjectId = id;
    }

    addProject("Today", "Do this today.");
    addProject("This Week", "Finish by the end of the week.");
    addProject("This Month", "To be completed by the end of the month.");
    addProject("This Year", "Yearly evaluation here.");
    defaultProjectId.push(projectArray[0].id);
    defaultProjectId.push(projectArray[1].id);
    defaultProjectId.push(projectArray[2].id);
    defaultProjectId.push(projectArray[3].id);

    let currentProjectId;

    setCurrentProjectId(projectArray[0].id);

    return {addProject, readProject, deleteProject, getCurrentProject, setCurrentProjectId, getTodoFromCurrentProject, returnProjectArray};
};




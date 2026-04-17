'use strict'

class Project{
    constructor(name, description){
        this.id = crypto.randomUUID();
        this.name = name;
        this.description = description;
    }

    todoArray = [];

    changeName(name){
        this.name = name;
    }

    changeDescription(description){
        this.description = description;
    }

    addTodo(todoTitle, todoDescription, todoDueDate, todoPriority) {
        this.todoArray.push(new ToDo(todoTitle, todoDescription, todoDueDate, todoPriority));
    }

    deleteTodo(id) {
        this.todoArray = this.todoArray.filter((todoItem) => {
            return todoItem.id !== id;
        });
    }

    readTodo() {
        return [...this.todoArray];
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
        save();
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
        save();
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
        save();
    }

    let currentProjectId;

    function save(){
        localStorage.setItem("projects", JSON.stringify(projectArray));
        localStorage.setItem("currentProjectId", currentProjectId);
    }

    function createDefaultProjects(){
        const p1 = new Project("Today", "Do this today.");
        const p2 = new Project("This Week", "Finish by the end of the week.");
        const p3 = new Project("This Month", "To be completed by the end of the month.");
        const p4 = new Project("This Year", "Yearly evaluation here.");

        projectArray.push(p1, p2, p3, p4);

        defaultProjectId.push(p1.id, p2.id, p3.id, p4.id);
    }

    function load(saveData){
        const parsed = JSON.parse(saveData);

        parsed.forEach((projObj) => {
            const project = new Project(projObj.name, projObj.description);
            project.id = projObj.id;

            if (projObj.todoArray){
                projObj.todoArray.forEach((todoObj) => {
                    const todo = new ToDo(todoObj.name, todoObj.description, todoObj.dueDate, todoObj.priority);
                    todo.id = todoObj.id;
                    todo.checked = todoObj.checked;
                    
                    project.todoArray.push(todo);
                })
            }
            projectArray.push(project);
        });

        const savedId = localStorage.getItem("currentProjectId");
        if (savedId){
            currentProjectId = savedId;
        } else {
            currentProjectId = projectArray[0].id;
        }
    }

    const saveData = localStorage.getItem("projects");
    if (saveData){
        load(saveData);
    } else{
        createDefaultProjects();
    }
    if (!currentProjectId && projectArray.length > 0){
        currentProjectId = projectArray[0].id;
        save();
    }

    return {addProject, readProject, deleteProject, getCurrentProject, setCurrentProjectId, getTodoFromCurrentProject, returnProjectArray, save};
};




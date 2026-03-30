'use strict'

//example todo object: todo {id (using cryptID): 123hasdjasjd123ad, title: 'do abc', description: "This is how you do that", due: 30th March 2026, priority: High, status: unchecked}
//example project object: project {id (using cryptID): 123hasdjasjd123ad, title: 'do abc'}

class Project{
    constructor(name){
        this.id = crypto.randomUUID();
        this.name = name;
    }

    #todoArray = [];

    changeName(name){
        this.name = name;
    }

    addTodo(todoTask) {
        this.#todoArray.push(todoTask);
    }

    deleteTodo(id) {
        this.#todoArray = this.#todoArray.filter((todoItem) => {
            return todoItem.id !== id;
        });
    }

    readTodo() {
        return this.#todoArray.splice();
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

function todoController(){
    const projectArray = [];

    const addProject = function(project){
        projectArray.add(project);
    };

    const readProject = function(){
        return projectArray.splice();
    };
    
    const deleteProject = function(deleteId){
        projectArray = projectArray.filter((project) => project.id !== deleteId);
    };

    
};
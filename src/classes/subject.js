import {createTaskPopUp} from "../components/taskPopUp";

export class Task {
    constructor(title, description, expireDate, priority) {
      this.title = title;
      this.description = description;
      this.dueDate = expireDate;
      this.priority = priority;
      this.complete = false;
    }
}

export class Subject {
    constructor(name, acronym) {
        this.name = name;
        this.acronymus = acronym;
        this.tasks = [];     //tasks created by the user <- array of tasks
    }

    addTask(task_added) {
        this.tasks.push(task_added);
    }

    renderSubjectPage() {
        let doc = document.querySelector(".subjectDiv");
        const subjectDiv = document.createElement("div");
        subjectDiv.className = ("subject-" + this.name, "subject");
        
        const title = document.createElement("h3");
        
        const tasksDiv = document.createElement("div");
        tasksDiv.className = ("tasksDiv-" + this.name);
        title.textContent = this.name;
        
        const taskButton = document.createElement("button");
        taskButton.textContent = "Add Task";

        taskButton.className = ("task-button");
        taskButton.addEventListener("click", (e) =>{
            const popUp = createTaskPopUp();
            subjectDiv.appendChild(popUp);
            popUp.showModal();
        })

        subjectDiv.append(title, tasksDiv, taskButton);
        doc.append(subjectDiv);
    }

}
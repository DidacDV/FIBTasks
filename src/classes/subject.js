import {createTaskPopUp, renderNewTask} from "../components/taskRender";

export class Task {
    constructor(title, description, expireDate, priority, type) {
      this.title = title;
      this.description = description;
      this.dueDate = expireDate;
      this.priority = priority;
      this.type = type;
      this.complete = false;
    }
}

export class Subject {
    constructor(name, acronym) {
        this.name = name;
        this.acronymus = acronym;
        this.tasks = [];     //tasks created by the user <- array of tasks
    }

    renderSubjectPage() {
        let doc = document.querySelector(".subjectDiv");
        const subjectDiv = document.createElement("div");
        subjectDiv.className = ("subject-" + this.name, "subject");
        
        const title = document.createElement("h3");
        
        const tasksDiv = document.createElement("div");
        tasksDiv.id = ("tasksDiv-" + this.name);
        tasksDiv.classList.add("tasksDiv");
        title.textContent = this.name;
        
        const taskButton = document.createElement("button");
        taskButton.textContent = "Add Task";

        taskButton.className = ("task-button");
        taskButton.addEventListener("click", (e) =>{
            const { popUp, form } = createTaskPopUp();

            form.addEventListener("submit", (e) => {
                e.preventDefault(); //so data doesn't get lost

                const formData = new FormData(form); //parse form for a better handling
                const newTask = new Task(
                    formData.get("title"),
                    formData.get("description"),
                    formData.get("dueDate"),
                    formData.get("priority"),
                    formData.get("labOrTheory")
                );
                this.addNewTask(newTask);
                popUp.close();
                popUp.remove();

            })

            subjectDiv.appendChild(popUp);
            popUp.showModal();

        })

        subjectDiv.append(title, tasksDiv, taskButton);
        doc.append(subjectDiv);
    }

    addNewTask(t) {
        this.tasks.push(t);
        renderNewTask(t, this);
    }

    removeTask(name) {
        this.tasks.delete(name);
    }

}


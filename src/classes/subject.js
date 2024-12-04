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

    saveTasks() {
        const key = `tasks-${this.name}`; //create a key to store values for each subject, storing tasks per subject
        const toSave = this.tasks.map(task => ({
            title: task.title,
            description: task.description,
            dueDate: task.dueDate,
            priority: task.priority,
            type: task.type,
            complete: task.complete,
        }));
        localStorage.setItem(key,JSON.stringify(toSave)); //save tasks inJSON format to localStorage
    }

    loadTasks() {
        const key = `tasks-${this.name}`;
        const savedTasks = JSON.parse(localStorage.getItem(key)) || [];
        this.tasks = savedTasks.map(task => new Task(task.title, task.description, task.dueDate, task.priority, task.type));
    }

    renderSubjectPage() {
        let doc = document.querySelector(".subjectDiv");
        const subjectDiv = document.createElement("div");
        subjectDiv.className = ("subject-" + this.name, "subject");
        subjectDiv.id = ("subject-" + this.name);
        
        const title = document.createElement("h3");
        
        const tasksDiv = document.createElement("div");
        tasksDiv.id = ("tasksDiv-" + this.name);
        tasksDiv.classList.add("tasksDiv");
        title.textContent = this.name;
        
        const taskButton = document.createElement("button");
        taskButton.textContent = "Add Task";

        taskButton.classList.add("task-button", "blue-button");
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

            });

            subjectDiv.appendChild(popUp);
            popUp.showModal();

        });

        subjectDiv.append(title, tasksDiv, taskButton);
        doc.append(subjectDiv);
    }

    renderAllTasks() {
        this.loadTasks();
        this.tasks.forEach(task => {
            renderNewTask(task,this);       //when going to a subject, render all of its tasks created before by the user from local storage
        })
    }

    addNewTask(t) {
        this.tasks.push(t);
        renderNewTask(t,this);
        this.saveTasks();
    }

    removeTask(title) {
        localStorage.removeItem(title);
        this.tasks = this.tasks.filter(task => task.title !== title);
        this.saveTasks();
    }

}


class Task {
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

}
export const createTaskPopUp = () => {
    const popUp = document.createElement("dialog");
    popUp.classList.add("task-popup");

    const form = document.createElement("form");
    form.classList.add("task-form");

    const titleLabel = document.createElement("label");
    titleLabel.textContent = "Task Title";
    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.required = true;

    const descLabel = document.createElement("label");
    descLabel.textContent = "Description";
    const descInput = document.createElement("textarea");
    descInput.name = "description";
    descInput.rows = 4;

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Due Date";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.name = "dueDate";
    dateInput.required = true;
    //choose the priority you want to give it
    const priorityLabel = document.createElement("label");
    priorityLabel.textContent = "Priority";
    const prioritySelect = document.createElement("select");
    prioritySelect.name = "priority";
    const priorityOptions = [
        { value: "low", text: "Low" },
        { value: "medium", text: "Medium" },
        { value: "high", text: "High" }
    ];
    priorityOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        prioritySelect.appendChild(optionElement);
    });
    //choose if its lab or theory type of assigment
    const isLabLabel = document.createElement("label");
    isLabLabel.textContent = "Laboratory Or Theory";
    const labSelect = document.createElement("select");
    labSelect.name = "labOrTheory";
    const labOptions = [
        { value: "lab", text: "Lab" },
        { value: "theory", text: "Theory" },
    ]
    labOptions.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        labSelect.appendChild(optionElement);
    });

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Create Task";
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = "Cancel";
    cancelButton.addEventListener("click", () =>  {
        popUp.close()
        popUp.remove();
    });


    form.append(titleLabel, titleInput, descLabel, descInput, dateLabel, dateInput, priorityLabel, prioritySelect, isLabLabel, labSelect, buttonContainer);
    buttonContainer.append(submitButton, cancelButton);
    popUp.appendChild(form);

    return {popUp, form};
};


export const renderNewTask = (task, subject) => {
    const tasklist = document.getElementById("tasksDiv-" + subject.name);
    if (!tasklist) {
        console.error(`Task list for subject ${subject.name} not found.`);
        return;
    }

    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");

    const taskBasicInfo = document.createElement("div");
    taskBasicInfo.classList.add("task-basic-info");
    taskBasicInfo.classList.add("task-not-done");
    const taskName = document.createElement("p");
    taskName.textContent = task.title;
    taskName.classList.add("task-name");
    const taskDueDate = document.createElement("p");
    taskDueDate.textContent = `Due: ${task.dueDate}`;
    taskDueDate.classList.add("task-due-date");
    taskBasicInfo.append(taskName);
    taskBasicInfo.append(taskDueDate);
    const detailsButton = document.createElement("button");
    detailsButton.textContent = "Details";
    detailsButton.classList.add("details-button");
    detailsButton.addEventListener("click", () => {
        createTaskDetailsModal(task);
    });

    const doneButton = document.createElement("button");
    doneButton.classList.add("done-button");
    doneButton.innerHTML = "✔️"; //maybe i should change it for a svg
    doneButton.title = "Mark as Done";
    doneButton.addEventListener("click", () => {
        task.complete = true;
        if (taskBasicInfo.classList.contains("task-not-done")) {
            taskBasicInfo.classList.remove("task-not-done");
            taskBasicInfo.classList.add("task-done");
        }
        else {
            taskBasicInfo.classList.remove("task-done");
            taskBasicInfo.classList.add("task-not-done");
        }
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "🗑️"; // Unicode trash can icon
    removeButton.title = "Remove Task";
    removeButton.addEventListener("click", () => {
        taskCard.remove();
        subject.removeTask(task.name);
    });

    taskCard.append(doneButton, taskBasicInfo, detailsButton, removeButton);
    tasklist.appendChild(taskCard);
};

const createTaskDetailsModal = (task) => {
    const modal = document.createElement("dialog");
    modal.classList.add("task-details-modal");

    //another way of doing it, instead of creating every element, just insert the HTML directly
    modal.innerHTML = `            
        <h2>${task.title}</h2>
        <p><strong>Description:</strong> ${task.description || "No description provided"}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p><strong>Priority:</strong> ${task.priority}</p>
        <p><strong>Type:</strong> ${task.type}</p>
    `;
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.classList.add("close-modal-button");
    closeButton.addEventListener("click", () => {
        modal.close();
        modal.remove();
    });
    modal.appendChild(closeButton);
    document.body.appendChild(modal);
    modal.showModal();
};
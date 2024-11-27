export const createTaskPopUp = (onTaskCreate) => {
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


export const renderNewTask = (t,subject) => {
    const tasklist = document.getElementById("tasksDiv-" + subject.name);
    console.log(subject.name);

}
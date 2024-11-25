export const createTaskPopUp = () => {
    const popUp = document.createElement("dialog");
    popUp.classList.add("popUpHide");
    const test = document.createElement("p");
    test.textContent = "Add task info";
    console.log(test.textContent);
    popUp.append(test);

    return popUp;
}
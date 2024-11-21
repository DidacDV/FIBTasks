import { createHeader } from "./components/header";
import { createSidebar } from "./components/sidebar";
/*
    class -> with -
    variable -> with _
*/



const renderDOM = () => {
    const app = document.querySelector("#app");
    app.appendChild(createHeader());

    //create div for bar and content
    const container = document.createElement("div");
    container.classList.add("container");
    container.appendChild(createSidebar());
    const rightSide = document.createElement("div");
    rightSide.classList.add("subjectDiv");
    container.appendChild(rightSide);
    app.appendChild(container);
}

export {renderDOM};

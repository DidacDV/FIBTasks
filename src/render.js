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
    app.appendChild(container);
}

export {renderDOM};

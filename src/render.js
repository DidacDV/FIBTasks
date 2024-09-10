import { createHeader } from "./components/header";
/*
    class -> with -
    variable -> with _
*/



const renderDOM = () => {
    const app = document.querySelector("#app");
    app.appendChild(createHeader());
}

export {renderDOM};
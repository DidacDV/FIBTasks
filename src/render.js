import { createHeader } from "./components/header";




const renderDOM = () => {
    const app = document.querySelector("#app");
    app.appendChild(createHeader());
}

export {renderDOM};
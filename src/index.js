import "./styles.css";
import { renderDOM } from "./render";
//because index is the main file, we use it as a connecting point with the classes
import { Quatri } from "./classes/quatri"; 
const quatris = [];



renderDOM();

const checkForNewQuatri = () => {
   quatri_dropdown.addEventListener("change", (e) => {
      const selectedValue = e.target.value;
      const new_quatri = new Quatri(selectedValue,["math"],2212);  //trying with default values
      quatri_list.appendChild(new_quatri.createAndDisplayQuatri());
      quatri_dropdown.style.display = "none"; //hide it again after using it
   });
} 

const quatri_list = document.querySelector(".quatri-list"); 
const quatri_dropdown = document.querySelector(".quatri-dropdown");

checkForNewQuatri();
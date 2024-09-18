import "./styles.css";
import { renderDOM } from "./render";
//because index is the main file, we use it as a connecting point with the classes
import { Quatri } from "./classes/quatri"; 
const quatris = [];

renderDOM();
const quatri_list = document.querySelector(".quatri-list"); 
const quatri_dropdown = document.querySelector(".quatri-dropdown");


function checkIfQuatriExists(quatri_id) {
   for (const q of quatris) {
      if (q.id == quatri_id) {
         return true;
      }
   }
   return false;
}

const sortQuatrisAlphabetically = () => {
   quatris.sort((a, b) => a.id.localeCompare(b.id));
};

const renderSortedQuatris = () => {
   quatri_list.innerHTML = ""; //clear up the list before rendering again
   for(const q of quatris) {
      quatri_list.appendChild(q.createAndDisplayQuatri());
   }
};

const addNewQuatri = (selectedValue) => {
   const new_quatri = new Quatri(selectedValue, ["math"], 2212);
   quatris.push(new_quatri);
   sortQuatrisAlphabetically();
   renderSortedQuatris();
}

const checkForNewQuatri = (e) => {
   const selectedValue = e.target.value;
   if (checkIfQuatriExists(selectedValue)) {
         alert("Quatri selected already exists");
   }
   else addNewQuatri(selectedValue);
   quatri_dropdown.value = "none";
   quatri_dropdown.style.display = "none";
};


const init = () => {
   quatri_dropdown.addEventListener("change", checkForNewQuatri);
}

init();


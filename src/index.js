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
      if (q.id === quatri_id) {
         return true;
      }
   }
   return false;
}

const sortQuatrisAlphabetically = () => {
   quatris.sort((a, b) => a.id.localeCompare(b.id));
};

const addNewQuatri = (selectedValue) => {
   const new_quatri = new Quatri(selectedValue, 2212);
   quatris.push(new_quatri);
   console.log(selectedValue);
   const quatriElement = new_quatri.createAndDisplayQuatri();
   quatri_list.appendChild(quatriElement);
};


const checkForNewQuatri = (e) => {
   const selectedValue = e.target.value;
   if (checkIfQuatriExists(selectedValue)) {
         alert("Quatri selected already exists");
   }
   else addNewQuatri(selectedValue);
   quatri_dropdown.value = "none";
   quatri_dropdown.style.display = "none";
};

const removeQuatri = (id) => {
   let remove = quatris.findIndex((value) => id === value.id);
   if (remove !== -1) { //if it exists
      quatris.splice(remove,1); //delete from array
   }
   else throw "Quatri doesn't exist";
}


const init = () => {
   quatri_dropdown.addEventListener("change", checkForNewQuatri);
   document.addEventListener("remove-quatri", (e) => {
      let id = e.detail.quatri_id; //passed by the event from quatri.js
      console.log("Trying to remove quatri with id: "+ id);
      removeQuatri(id);
   })
}

init();


import { trash_icon_info } from "../assets/trash_icon";

//quatri when shown in side bar -> quatriId, user subjects and add subject button


export class Quatri {
    constructor(id, subjects, year) {
        this.id = id;
        this.subjects = subjects;  //Array of subjects to choose from
        this.user_subjects = []; //Array of subjects that have been picked by the user to keep track on.
        this.year = year;
        this.element = null;
    }

    createAndDisplayQuatri() {
        const quatri_div = document.createElement("div");
        quatri_div.classList.add("quatri-container");
        
        const quatri_header = document.createElement("div");
        quatri_header.classList.add("quatri-header");
        
        const default_quatri = document.createElement("p");
        default_quatri.classList = "default";
        default_quatri.textContent = this.id;
        
        const trash_icon = document.createElement("svg");
        trash_icon.innerHTML = trash_icon_info;
        
        const subject_list = document.createElement("div");
        subject_list.classList.add("subject-list");
        subject_list.style.display = "none"; //Hidden until you click on the quatri 
        
        const add_subject_btn = document.createElement("button"); //this button is only for the quatri on which it is on
        add_subject_btn.textContent = "Add Subject";
        add_subject_btn.style.display = "none"; //Same as subject list

        quatri_header.appendChild(default_quatri);
        quatri_header.appendChild(trash_icon);
        
        //To make the quatri's info appear or hide when clicked
        quatri_header.addEventListener("click", () => {
            const isExpanded = subject_list.style.display === "block";
            subject_list.style.display = isExpanded ? "none" : "block";
            add_subject_btn.style.display = isExpanded ? "none" : "block";
        });
        
        quatri_div.appendChild(quatri_header);
        quatri_div.appendChild(subject_list);
        quatri_div.appendChild(add_subject_btn);

        //Saving the dom element to itself, i dont think it is 100% needed
        this.element = quatri_div;

        return quatri_div;  //Returning the dom element
    }
}


import { trash_icon_info } from "../assets/trash_icon";
import { Subject } from "./subject";

//quatri when shown in side bar -> quatriId, user subjects and add subject button
const subjects = {"Q1": ["IC"]}; //if added, it is deleted from here, if it is deleted, it is added to here
let page = "";

export class Quatri {
    constructor(id, subjects, year) {
        this.id = id;
        this.subjects = subjects;  //Array of subjects to choose from
        this.user_subjects = []; //Array of subjects that have been picked by the user to keep track on.
        this.year = year;
        this.element = null;
    }

    createSubjectListToChoose(subjectsToChoose) {
        const toChoose = document.createElement("select");
        toChoose.classList.add("toChooseSubject-dropdown");
        toChoose.id = "choose" + this.id;
        toChoose.style.display = "none"; 
    
        const informationOption = document.createElement("option");
        informationOption.classList.add("placeholder");
        informationOption.value = "none";
        informationOption.textContent = "-Select a Subject-";
        informationOption.disabled = true;//not avalaible, only for UI guide
        informationOption.selected = true; 
        toChoose.appendChild(informationOption);

        for (let elem of subjectsToChoose) {
            const optionElement = document.createElement("option");
            optionElement.value = elem;
            optionElement.textContent = elem;
            toChoose.appendChild(optionElement);
        }
        return toChoose;
    }


    createAndDisplayQuatri() {
        const quatri_div = document.createElement("div");
        quatri_div.classList.add("quatri-container");
        quatri_div.classList.add("non-expanded");
        const quatri_header = document.createElement("div");
        quatri_header.classList.add("quatri-header");
        
        const quatri_name = document.createElement("p");
        quatri_name.classList = "quatri-name";
        quatri_name.textContent = this.id;
        
        const trash_icon = document.createElement("svg");
        trash_icon.id = ("trash-icon");
        trash_icon.innerHTML = trash_icon_info;
        
        trash_icon.addEventListener("click",(e) => {
            e.stopPropagation(); //needed so it doesn't toggle the dropdown!
            this.removeQuatri();
        })

        const subject_list = document.createElement("div");
        subject_list.classList.add("subject-list");
        subject_list.style.display = "none"; //Hidden until you click on the quatri 
        
        const add_subject_btn = document.createElement("button"); //this button is only for the quatri on which it is on
        add_subject_btn.classList.add("add-subject-button");
        add_subject_btn.textContent = "Add Subject";
        add_subject_btn.style.display = "none"; //Same as subject list
            
        add_subject_btn.addEventListener("click", () => {
            const subjectsToChoose = this.getSubjectOptions();
            let dropdown = document.querySelector("#choose" + this.id);
            if (!dropdown) {    //if it doesn't exist, create it and display it
                dropdown = this.createSubjectListToChoose(subjectsToChoose);
                quatri_div.appendChild(dropdown); // 
            }
        
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
            dropdown.addEventListener("change", (event) => {
                const selectedSubject = event.target.value;
                if (selectedSubject !== "none") {
                    this.addSubject(selectedSubject);
                    dropdown.style.display = "none"; 
                }
            });
        });
        


        quatri_header.appendChild(quatri_name);
        quatri_header.appendChild(trash_icon);
        
        //To make the quatri's info appear or hide when clicked
        quatri_header.addEventListener("click", () => {
            const isExpanded = subject_list.style.display === "block";
        
            if (isExpanded) {
                subject_list.style.display = "none";
                quatri_div.classList.remove("expanded");
                quatri_div.classList.add("non-expanded");
            } else {
                subject_list.style.display = "block";
                quatri_div.classList.remove("non-expanded");
                quatri_div.classList.add("expanded");
            }
        
            add_subject_btn.style.display = isExpanded ? "none" : "block";
        });
        
        quatri_div.appendChild(quatri_header);
        quatri_div.appendChild(subject_list);
        quatri_div.appendChild(add_subject_btn);

        //Saving the dom element to itself, i dont think it is 100% needed
        this.element = quatri_div;

        return quatri_div;  //Returning the dom element
    }

    getSubjectOptions() {
        return subjects[this.id]; //get all subjects of intended quatri
    }


    addSubject(subject_added) {
        const added = new Subject(subject_added, "none"); 
        this.user_subjects.push(added);
        this.renderSubject(added); 
        const dropdown = document.querySelector(".toChooseSubject-dropdown");
        const optionToRemove = Array.from(dropdown.options).find(option => option.value === subject_added);
        if (optionToRemove) {
            optionToRemove.remove(); // Remove the selected option
        }
    }
    

    renderSubject(subject) {
        let subject_list = document.querySelector(".subject-list");
        const subjectDisplayed = document.createElement("button");
        subjectDisplayed.addEventListener("click",() => {
            if (page != subject.name) {
                page = subject.name;
                subject.renderSubjectPage();
            }
        })
        subjectDisplayed.textContent = subject.name;
        subject_list.appendChild(subjectDisplayed);
    }

    removeQuatri() {
        const removeQuatriEvent = new CustomEvent("remove-quatri", {
            detail: {
                quatri_id: this.id,
            },
        });

        try {
            document.dispatchEvent(removeQuatriEvent);
            this.element.remove();
        }
        catch (err) {
            console.log(err);
        }
    }

}


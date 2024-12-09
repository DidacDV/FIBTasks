import { trash_icon_info } from "../assets/trash_icon";
import { Subject } from "./subject";
import {subjects} from "../assets/subjects";
import * as render from "../render";
//quatri when shown in side bar -> quatriId, user subjects and add subject button

let page = "";

export class Quatri {
    constructor(id, year) {
        this.id = id;
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
        informationOption.textContent = "- Select -";
        informationOption.disabled = false; //it can be clicked but wont do anything, so first quatri doesn't get disabled
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
        trash_icon.className = ("trash-icon");
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
            let dropdown = this.element.querySelector("#choose" + this.id);
            if (!dropdown) {    //if it doesn't exist, create it and display it
                dropdown = this.createSubjectListToChoose(subjectsToChoose);
                quatri_div.appendChild(dropdown); // 
            }
        
            dropdown.style.display = dropdown.style.display === "none" ? "block" : "none";
            dropdown.onchange = (e) => {
                const selectedSubject = e.target.value;
                if (selectedSubject !== "none") {
                    this.addSubject(selectedSubject);
                    dropdown.style.display = "none";
                }
            }
        });

        quatri_header.appendChild(quatri_name);
        quatri_header.appendChild(trash_icon);
        
        //To make the quatri's info appear or hide when clicked
        quatri_header.addEventListener("click", () => {
            const isExpanded = subject_list.style.display === "flex";
        
            if (isExpanded) {
                subject_list.style.display = "none";
                quatri_div.classList.remove("expanded");
                quatri_div.classList.add("non-expanded");
            } else {
                subject_list.style.display = "flex";
                quatri_div.classList.remove("non-expanded");
                quatri_div.classList.add("expanded");
            }
        
            add_subject_btn.style.display = isExpanded ? "none" : "flex";
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
        console.log(subject_added);

        const added = new Subject(subject_added, "none");
        this.user_subjects.push(added);
        this.renderSubject(added); 
        const dropdown = this.element.querySelector(".toChooseSubject-dropdown");
        const optionToRemove = Array.from(dropdown.options).find(option => option.value === subject_added);
        if (optionToRemove) {
            optionToRemove.remove(); // Remove the selected option
        }
    }

    removeSubject(subject_name) {
        const subjectIndex = this.user_subjects.findIndex(subject => subject.name === subject_name);

        const removedSubject = this.user_subjects.splice(subjectIndex, 1)[0];
        const subjectList = this.element.querySelector(".subject-list");
        const subjectButton = Array.from(subjectList.children).find(button => button.textContent === subject_name);
        if (subjectButton) {
            subjectButton.remove();
        }
        //re adding to the dropdown
        const dropdown = this.element.querySelector(".toChooseSubject-dropdown");
        if (dropdown) {
            const optionElement = document.createElement("option");
            optionElement.value = removedSubject.name;
            optionElement.textContent = removedSubject.name;
            dropdown.appendChild(optionElement);
        }

        render.removeSubject(subject_name);


    }

    renderSubject(subject) {
        let subject_list = this.element.querySelector(".subject-list");
        const subjectBarDiv = document.createElement("div");
        subjectBarDiv.id = ("subject-bar" + subject.name);
        subjectBarDiv.className = ("subject-bar");
        const subjectDisplayed = document.createElement("button");
        subjectDisplayed.addEventListener("click",() => {
            const existingSubjectDiv = document.getElementById(`subject-${subject.name}`);
            if (existingSubjectDiv) {
                console.log(`Subject "${subject.name}" is already displayed.`);
                return;
            }
            subject.renderSubjectPage();
            subject.renderAllTasks();
        })

        const removeSubjectButton = document.createElement("button");
        removeSubjectButton.textContent = "X";
        removeSubjectButton.className = "remove-subject-button";
        removeSubjectButton.addEventListener("click",() => {
            this.removeSubject(subject.name);
            const subjectBarToRemove = this.element.querySelector("#subject-bar" + subject.name);
            subjectBarToRemove.remove();
        })

        subjectDisplayed.textContent = subject.name;
        subjectBarDiv.appendChild(subjectDisplayed);
        subjectBarDiv.appendChild(removeSubjectButton);
        subject_list.appendChild(subjectBarDiv);
    }

    removeQuatri() {
        const removeQuatriEvent = new CustomEvent("remove-quatri", {
            detail: {
                quatri_id: this.id,
            },
        });

        try {
            for (const subject of this.user_subjects) {
                subject.removeAllTasks();
                render.removeSubject(subject.name);
            }
            this.user_subjects = [];
            document.dispatchEvent(removeQuatriEvent);
            this.element.remove();
        }
        catch (err) {
            console.log(err);
        }
    }

}


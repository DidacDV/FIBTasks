export function createSidebar() {
    const quatri_options = ["Q1", "Q2", "Q3", "Q4", "Q5"];

    
    const bar = document.createElement("div");
    bar.classList.add("side-bar");

    const side_title = document.createElement("p");
    side_title.textContent = "Quatris enlisted";
    side_title.className = "title";
    bar.appendChild(side_title);

    const quatri_list = document.createElement("div");
    quatri_list.classList.add("quatri-list");

    bar.appendChild(quatri_list);
    //Button to add new quatri + its container for the dropdown
    const quatri_btn_container = document.createElement("div");
    quatri_btn_container.classList.add("btn-container");
    const add_quatri_btn = document.createElement("button");
    add_quatri_btn.id = "new-quatri";
    add_quatri_btn.classList.add("sideBarBtn");
    add_quatri_btn.textContent = "Add Quatri";

    //This menu will be used to choose upon all quatris of FIB
    const quatri_dropdown = document.createElement("select");
    quatri_dropdown.classList.add("quatri-dropdown");
    quatri_dropdown.style.display = "none"; 

    const informationOption = document.createElement("option");
    informationOption.classList.add("placeholder");
    informationOption.value = "none";
    informationOption.textContent = "-Select a Quatri-";
    informationOption.disabled = true;//not avalaible, only for UI guide
    informationOption.selected = true; 
    quatri_dropdown.appendChild(informationOption);

    for (const option of quatri_options) {
        const optionElement = document.createElement("option");
        optionElement.value = option;
        optionElement.textContent = option;
        quatri_dropdown.appendChild(optionElement);
    }


    add_quatri_btn.addEventListener("click", () => {
        quatri_dropdown.style.display = quatri_dropdown.style.display === "none" ? "block" : "none";    //hide it if shown, show it if hidden
    });

    quatri_btn_container.appendChild(add_quatri_btn);
    quatri_btn_container.appendChild(quatri_dropdown);
    bar.appendChild(quatri_btn_container);

    return bar;
}

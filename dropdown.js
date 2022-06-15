const ingredients2 = document.querySelector("#ingredients2")
const appliances2 = document.querySelector("#appliances2");
const ustensils2 = document.querySelector("#ustensils2")

const listIngredients2 = document.querySelector("#list-ingredients2");
const listAppliances2 = document.querySelector("#list-appliances2");
const listUstensils2 = document.querySelector("#list-ustensils2");

const arrow12 = document.querySelector("#arrow12")
const arrow22 = document.querySelector("#arrow22")
const arrow32 = document.querySelector("#arrow32")

const box12 = document.querySelector("#box12")
const box22 = document.querySelector("#box22")
const box32 = document.querySelector("#box32")

ingredients2.addEventListener("click", openDropdown2)
appliances2.addEventListener("click", openDropdown2)
ustensils2.addEventListener("click", openDropdown2)

arrow12.addEventListener("click", closeDropdown2)
arrow22.addEventListener("click", closeDropdown2)
arrow32.addEventListener("click", closeDropdown2)

//test input listener
//const inputIngredients = document.querySelector("#inputIngredients2");
//const inputAppliances = document.querySelector("#inputAppliances2");
//const inputUstensils = document.querySelector("#inputUstensils2");
/////////////////////

let i2 = 0

function openDropdown2() {

    box12.style.width = "177px"
    box12.style.height = "55px"
    arrow12.style.transform = "rotate(90deg)"
    box22.style.width = "177px"
    box22.style.height = "55px"
    arrow22.style.transform = "rotate(90deg)"
    box32.style.width = "177px"
    box32.style.height = "55px"
    arrow32.style.transform = "rotate(90deg)"

    ingredients2.textContent = "Ingredients"
    appliances2.textContent = "Appliances"
    ustensils2.textContent = "Ustensils"

    ingredients2.addEventListener("click", openDropdown2)
    appliances2.addEventListener("click", openDropdown2)
    ustensils2.addEventListener("click", openDropdown2)

    listIngredients2.style.display = "none"
    ingredients2.style.borderRadius = "4px"
    listAppliances2.style.display = "none"
    appliances2.style.borderRadius = "4px"
    listUstensils2.style.display = "none"
    ustensils2.style.borderRadius = "4px"

    i2 = 0;

    if (this.id == "ingredients2") {
        box12.style.width = "667px"
        ingredients2.style.borderRadius = "4px 4px 0 0"
        arrow12.style.transform = "rotate(270deg)"


        ingredients2.innerHTML = '<input type="text" id="inputIngredients2" placeholder="Rechercher">'
        ingredients2.removeEventListener("click", openDropdown2)

        listIngredients2.style.display = "block"

        const inputIngredients = document.querySelector("#inputIngredients2");
        inputIngredients.onkeyup = function () {
            searchAlgoFilterDropdownIngredients(inputIngredients)
        }

        i2++;
    } else if (this.id == "appliances2") {
        box22.style.width = "667px"
        appliances2.style.borderRadius = "4px 4px 0 0"
        arrow22.style.transform = "rotate(270deg)"

        appliances2.innerHTML = '<input type="text" id="inputAppliances2" placeholder="Rechercher">'
        appliances2.removeEventListener("click", openDropdown2)

        listAppliances2.style.display = "block"

        const inputAppliances = document.querySelector("#inputAppliances2");
        inputAppliances.onkeyup = function () {
            searchAlgoFilterDropdownAppliances(inputAppliances)
        }

        i2++;
    } else if (this.id == "ustensils2") {
        box32.style.width = "667px"
        ustensils2.style.borderRadius = "4px 4px 0 0"
        arrow32.style.transform = "rotate(270deg)"

        ustensils2.innerHTML = '<input type="text" id="inputUstensils2" placeholder="Rechercher">'
        ustensils2.removeEventListener("click", openDropdown2)

        listUstensils2.style.display = "block"

        const inputUstensils = document.querySelector("#inputUstensils2");
        inputUstensils.onkeyup = function () {
            searchAlgoFilterDropdownUstensils(inputUstensils)
        }

        i2++;
    }
    
}

function closeDropdown2() {

    if (i2 >= 1 && this.id == "arrow12") {
        box12.style.width = "177px"
        ingredients2.style.borderRadius = "4px"
        arrow12.style.transform = "rotate(90deg)"
        
        ingredients2.textContent = "Ingredients"
        ingredients2.addEventListener("click", openDropdown2)

        listIngredients2.style.display = "none"

        i2 = 0;
    } else if (i2 == 0 && this.id == "arrow12") {
        resetDropDown2()

        box12.style.width = "667px"
        ingredients2.style.borderRadius = "4px 4px 0 0"
        arrow12.style.transform = "rotate(270deg)"

        ingredients2.innerHTML = '<input type="text" id="inputIngredients2" placeholder="Rechercher">'
        ingredients2.removeEventListener("click", openDropdown2)

        listIngredients2.style.display = "block"

        const inputIngredients = document.querySelector("#inputIngredients2");
        inputIngredients.onkeyup = function () {
            searchAlgoFilterDropdownIngredients(inputIngredients)
        }

        i2++;
    } else if (i2 >= 1 && this.id == "arrow22") {
        box22.style.width = "177px"
        appliances2.style.borderRadius = "4px"
        arrow22.style.transform = "rotate(90deg)"

        appliances2.textContent = "Appliances"
        appliances2.addEventListener("click", openDropdown2)

        listAppliances2.style.display = "none"

        i2 = 0;
    } else if (i2 == 0 && this.id == "arrow22") {
        resetDropDown2()

        box22.style.width = "667px"
        appliances2.style.borderRadius = "4px 4px 0 0"
        arrow22.style.transform = "rotate(270deg)"

        appliances2.innerHTML = '<input type="text" id="inputAppliances2" placeholder="Rechercher">'
        appliances2.removeEventListener("click", openDropdown2)

        listAppliances2.style.display = "block"

        const inputAppliances = document.querySelector("#inputAppliances2");
        inputAppliances.onkeyup = function () {
            searchAlgoFilterDropdownAppliances(inputAppliances)
        }

        i2++;
    } else if (i2 >= 1 && this.id == "arrow32") {
        box32.style.width = "177px"
        ustensils2.style.borderRadius = "4px"
        arrow32.style.transform = "rotate(90deg)"

        ustensils2.textContent = "Ustensils"
        ustensils2.addEventListener("click", openDropdown2)

        listUstensils2.style.display = "none"

        i2 = 0;
    } else if (i2 == 0 && this.id == "arrow32") {
        resetDropDown2()

        box32.style.width = "667px"
        ustensils2.style.borderRadius = "4px 4px 0 0"
        arrow32.style.transform = "rotate(270deg)"

        ustensils2.innerHTML = '<input type="text" id="inputUstensils2" placeholder="Rechercher">'
        ustensils2.removeEventListener("click", openDropdown2)

        listUstensils2.style.display = "block"

        const inputUstensils = document.querySelector("#inputUstensils2");
        inputUstensils.onkeyup = function () {
            searchAlgoFilterDropdownUstensils(inputUstensils)
        }

        i2++;
    }
}

function resetDropDown2() {
    box12.style.width = "177px"
    box12.style.height = "55px"
    arrow12.style.transform = "rotate(90deg)"
    box22.style.width = "177px"
    box22.style.height = "55px"
    arrow22.style.transform = "rotate(90deg)"
    box32.style.width = "177px"
    box32.style.height = "55px"
    arrow32.style.transform = "rotate(90deg)"

    ingredients2.textContent = "Ingredients"
    appliances2.textContent = "Appliances"
    ustensils2.textContent = "Ustensils"

    ingredients2.addEventListener("click", openDropdown2)
    appliances2.addEventListener("click", openDropdown2)
    ustensils2.addEventListener("click", openDropdown2)

    listIngredients2.style.display = "none"
    ingredients2.style.borderRadius = "4px"
    listAppliances2.style.display = "none"
    appliances2.style.borderRadius = "4px"
    listUstensils2.style.display = "none"
    ustensils2.style.borderRadius = "4px"
}

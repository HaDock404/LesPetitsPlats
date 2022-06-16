let tabFilterLoading = [];
let tabRecipes = [];
let tabFilter = [];

/*********************Create a Class Object*************************/
class Api {
    constructor(url) {
        this._url = url
    }

    async get() {
        return fetch(this._url)/*Fetch take data from a JSON file*/
            .then(res => res.json())
            .then(res => res.recipes)
            .catch(err => console.log('an error occurs', err))
    }
}

/************Create a Class legacy with "extends" & "super"****************/
class RecipesApi extends Api {

    constructor(url) {
        super(url)
    }

    async getRecipes() {
        return await this.get()
    }
}

let x = 0;

/* Create a class with a function, this function add dynamic HTML with data JSON*/
class RecipesCard {
    constructor(profil) {
        this._profil = profil
    }

    createRecipesCard() {
        const article = document.getElementById("recipes");
        
        let i = 0;
        x++;

        const recipesCard = '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+this._profil.name+'</h2><h5 class="recipeTime">'+this._profil.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+x+'"></ul></div><div class="instruction">'+this._profil.description+'</div></div></div></article>'
        
        article.innerHTML += recipesCard

        const ul = document.querySelector("#ul"+x+"")

        while (i < this._profil.ingredients.length) {

            ul.innerHTML += '<li>'+this._profil.ingredients[i].ingredient+'</li>'
            i++;
        }

        const CardRecipe = new SearchRecipe(this._profil.name, this._profil.time, this._profil.description, this._profil.ingredients, x, this._profil.appliance, this._profil.ustensils);
        tabRecipes.push(CardRecipe);

    }
}


class IngredientsFilter {
    constructor(profil) {
        this._profil = profil
    }

    createIngredientCard() {
        const ingredients = document.getElementById("ingredients-list");
        
        let i = 0;

        while (i < this._profil.ingredients.length) {

            if (tabFilterLoading.includes(this._profil.ingredients[i].ingredient)) {

            } else {
                tabFilterLoading.push(this._profil.ingredients[i].ingredient)
                const IngredientList = '<li class="ingredientClass">'+this._profil.ingredients[i].ingredient+'</li>'
                ingredients.innerHTML += IngredientList;
            }
            i++;
        }
    }
}



class AppliancesFilter {
    constructor(profil) {
        this._profil = profil
    }

    createApplianceCard() {
        const appliances = document.getElementById("appliances-list");
           
        if (tabFilterLoading.includes(this._profil.appliance)) {

        } else {
            tabFilterLoading.push(this._profil.appliance)
            const ApplianceList = '<li class="applianceClass">'+this._profil.appliance+'</li>'
            appliances.innerHTML += ApplianceList;
        }

    }
}


class UstensilsFilter {
    constructor(profil) {
        this._profil = profil
    }

    createUstensilCard() {
        const ustensils = document.getElementById("ustensils-list");
        
        let i = 0;

        while (i < this._profil.ustensils.length) {

            if (tabFilterLoading.includes(this._profil.ustensils[i])) {

            } else {
                tabFilterLoading.push(this._profil.ustensils[i])
                const UstensilList = '<li class="ustensilsClass">'+this._profil.ustensils[i]+'</li>'
                ustensils.innerHTML += UstensilList;
            }            
            i++;
        }
    }
}






/**************Class Object give file for the Class Legacy**************/
class App {
    constructor() {
        this.recipesApi = new RecipesApi('recipes.json')
    }

    async main() {
        const cards = await this.recipesApi.getRecipes()

        cards.forEach(profil => {/**For each Object use the previous function*/
            const Template = new RecipesCard(profil)
            Template.createRecipesCard()       
        })
            
    }

    async ingredientsFilter() {
        const cards = await this.recipesApi.getRecipes()

        cards.forEach(profil => {/**For each Object use the previous function*/
            const Template = new IngredientsFilter(profil)
            Template.createIngredientCard()       
        })    
    }

    async appliancesFilter() {
        const cards = await this.recipesApi.getRecipes()

        cards.forEach(profil => {/**For each Object use the previous function*/
            const Template = new AppliancesFilter(profil)
            Template.createApplianceCard()       
        })    
    }

    async ustensilsFilter() {
        const cards = await this.recipesApi.getRecipes()

        cards.forEach(profil => {/**For each Object use the previous function*/
            const Template = new UstensilsFilter(profil)
            Template.createUstensilCard()      
        }) 
        liListener();
    }
}

/**Use the Class Object everytime user load the page*/    
const app = new App();
app.main();
app.ingredientsFilter();
app.appliancesFilter();
app.ustensilsFilter();




/***********************Table for checking Data*********************************/

class SearchRecipe {
    constructor(name, time, description, ingredients, x, appliance, ustensils) {
        this.name = name;
        this.time = time;
        this.description = description;
        this.ingredients = ingredients;
        this.x = x;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }
}



class SearchFilter {
    constructor(name, time, description, ingredients, x, appliance, ustensils) {
        this.name = name;
        this.time = time;
        this.description = description;
        this.ingredients = ingredients;
        this.x = x;
        this.appliance = appliance;
        this.ustensils = ustensils;
    }
}





/**************************Search Recipes NEW ALGO *****************************/


const input = document.querySelector("#search-recipe");
const article = document.getElementById("recipes");
const filterIngredients = document.querySelector("#ingredients-list")
const filterAppliance = document.querySelector("#appliances-list")
const filterUstensils = document.querySelector("#ustensils-list")

input.onkeyup = function (e) {

    checkNumberChar()
    removeAllInnerRecipes()
    refreshPage()
}

function checkNumberChar() {

    if (input.value.length >= 3) {
        
        article.innerHTML = ""
        filterIngredients.innerHTML = ""
        filterAppliance.innerHTML = ""
        filterUstensils.innerHTML = ""
        tabInnerFilterWithSearch = []
        algoFunctionnalRecipes();
        liListener();
    }
}

/*function algoFunctionnalRecipes() {

    const filterTab = tabRecipes.filter(e => e.name.toLowerCase().includes(input.value.toLowerCase()));


    const mapfilterTab = filterTab.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    mapfilterTab.forEach(e => innerRecipe(e))

    tabRecipes.forEach(e => catchUl(e))   

}*/

/*******************************Test Algo*************************************/
let filterOn = 0

function algoFunctionnalRecipes() {

    let filterTab = []

    if (filterOn == 0) {
        
        tabRecipes.forEach(e => {
            let i = 0;
            if (e.name.toLowerCase().includes(input.value.toLowerCase())) {
                filterTab.push(e)
                i++;
            } else if (e.description.toLowerCase().includes(input.value.toLowerCase())) {
                filterTab.push(e)
                i++;
            }
    
            e.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.toLowerCase().includes(input.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    //console.log("ok")
                }
            })
        })
    } else {
        tabFilter.forEach(e => {
            let i = 0;
            if (e.name.toLowerCase().includes(input.value.toLowerCase())) {
                filterTab.push(e)
                i++;
            } else if (e.description.toLowerCase().includes(input.value.toLowerCase())) {
                filterTab.push(e)
                i++;
            }
    
            e.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.toLowerCase().includes(input.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    //console.log("ok")
                }
            })
        })
    }
    //console.log(filterTab)
    

    const mapfilterTab = filterTab.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    mapfilterTab.forEach(e => innerRecipe(e))

    tabRecipes.forEach(e => catchUl(e))

    /*****************************Filters**********************************/

    filterTab.forEach(e => innerAppliances(e))
    filterTab.forEach(e => e.ustensils.forEach(ustensils => innerUstensils(ustensils)))
    filterTab.forEach(e => e.ingredients.forEach(ingredients => innerIngredients(ingredients)))
}
/*****************************************************************************/

/*****************************Recipes Card*************************************/
let ul;

function catchUl(e) {

    if (document.querySelector("#ul"+e.x+"")) {
        ul = document.querySelector("#ul"+e.x+"")
        e.ingredients.forEach(el => innerUl(el))
    }
}

function innerUl(el) {

    ul.innerHTML += '<li>'+el.ingredient+'</li>'
}

function innerRecipe(e) {

    article.innerHTML += e;
}
/*****************************************************************************/
/********************************Filters cards********************************/
let tabInnerFilterWithSearch = []

function innerIngredients(ingredients) {

    if (tabInnerFilterWithSearch.includes(ingredients.ingredient)) {

    } else {
        filterIngredients.innerHTML += '<li class="ingredientClass">'+ingredients.ingredient+'</li>';
        tabInnerFilterWithSearch.push(ingredients.ingredient)
    }

    
}

function innerAppliances(e) {

    if (tabInnerFilterWithSearch.includes(e.appliance)) {

    } else {
        filterAppliance.innerHTML += '<li class="applianceClass">'+e.appliance+'</li>';
        tabInnerFilterWithSearch.push(e.appliance)
    }
}

function innerUstensils(ustensils) {

    if (tabInnerFilterWithSearch.includes(ustensils)) {

    } else {
        filterUstensils.innerHTML += '<li class="ustensilsClass">'+ustensils+'</li>';
        tabInnerFilterWithSearch.push(ustensils)
    }
    
    
}

/*****************************************************************************/

function removeAllInnerRecipes() {

    if (input.value.length < 3) {
        while (article.firstChild) {
            article.removeChild(article.firstChild);
          }
          while (filterIngredients.firstChild) {
            filterIngredients.removeChild(filterIngredients.firstChild);
          }
          while (filterAppliance.firstChild) {
            filterAppliance.removeChild(filterAppliance.firstChild);
          }
          while (filterUstensils.firstChild) {
            filterUstensils.removeChild(filterUstensils.firstChild);
          }
    }
    
}

function refreshPage() {

    if (input.value.length == 0) {
        tabRecipes = [];
        tabFilterLoading = [];

        app.main()
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();
    }
}

/*******************************Filter search NEW ALGO****************************/

const innerFilter = document.querySelector("#innerFilter")
let numberOfFilter = 0;

function liListener() {

    const li = document.querySelectorAll("li")

    for(i = 0; i < li.length; i++) {
        li[i].addEventListener("click", addFilter)
    }
}

let tabFilterUstensils = []
let tabFilterAppliances = []
let tabFilterIngredients = []
let tabFilterCliked = []

function addFilter(e) {//check kind of filter is clicked

    if(e.target.className == "ustensilsClass") {
        innerFilter.innerHTML += '<h3 class="ustensilsColor">'+e.target.innerHTML+' <span> x </span></h3>'

        numberOfFilter++;
        filterOn++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterUstensils.push(e.target.textContent)
        tabFilterCliked.push(e.target.textContent)

        filterClicked = e.target.textContent
        algoFilter();
        liListener()

    } else if(e.target.className == "applianceClass") {
        innerFilter.innerHTML += '<h3 class="appliancesColor">'+e.target.innerHTML+' <span> x </span></h3>'

        numberOfFilter++;
        filterOn++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterAppliances.push(e.target.textContent)
        tabFilterCliked.push(e.target.textContent)

        filterClicked = e.target.textContent

        algoFilter();
        liListener();

    } else if(e.target.className == "ingredientClass") {
        innerFilter.innerHTML += '<h3 class="ingredientsColor">'+e.target.innerHTML+' <span> x </span></h3>'

        numberOfFilter++;
        filterOn++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterIngredients.push(e.target.textContent)
        tabFilterCliked.push(e.target.textContent)

        filterClicked = e.target.textContent

        algoFilter();
        liListener();

    }
 
    const Span = document.querySelectorAll("span")
    
    for (i = 0; i < Span.length; i++) { //part for remove filters
        Span[i].addEventListener("click", removeFilter)
    }
}



/******************************Remove function for the filter********************/
/********************************************************************************/

let filterClassName;
let filterTextContent;

function removeFilter(Span) {
    console.log(Span)
    //firefox
    Span.composedPath()[1].remove();

    //chrome
    //Span.path[1].remove();

    numberOfFilter = 0;
    
    tabFilter = []
    tabFilterCliked = []
    
    tabFilterAttribute = 0;
    tabFilterUstensils = []
    tabFilterAppliances = []
    tabFilterIngredients = []

    if (Span.composedPath()[2].childNodes.length == 0) {

        article.innerHTML = ""

        tabRecipes = []
        tabFilterLoading = [];
        filterOn = 0;

        app.main();
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();

    } else {

        let i = 0;
        let NumberOfFilterlength = Span.composedPath()[2].childNodes.length;

        while (i < NumberOfFilterlength) {

            let string = Span.composedPath()[2].childNodes[i].innerText.slice(0, -2);

            filterTextContent = string;

            filterClassName = Span.composedPath()[2].childNodes[i].className

            addFilterAfterRemove()

            i++;
        }

        i = 0;
        while (i < NumberOfFilterlength) {
            //console.log(Span.path[2].childNodes[i])
            Span.composedPath()[2].childNodes[0].remove()
            i++;
        }
    }


    /*if (Span.path[2].childNodes.length == 0) {

        article.innerHTML = ""

        tabRecipes = []
        tabFilterLoading = [];
        filterOn = 0;

        app.main();
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();

    } else {

        let i = 0;
        let NumberOfFilterlength = Span.path[2].childNodes.length;

        while (i < NumberOfFilterlength) {

            let string = Span.path[2].childNodes[i].innerText.slice(0, -2);

            filterTextContent = string;

            filterClassName = Span.path[2].childNodes[i].className

            addFilterAfterRemove()

            i++;
        }

        i = 0;
        while (i < NumberOfFilterlength) {
            //console.log(Span.path[2].childNodes[i])
            Span.path[2].childNodes[0].remove()
            i++;
        }
    }*/
}

function addFilterAfterRemove() {

    if(filterClassName == "ustensilsColor") {
        innerFilter.innerHTML += '<h3 class="ustensilsColor">'+filterTextContent+' <span> x </span></h3>'
        //console.log(filterTextContent)
        
        numberOfFilter++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterUstensils.push(filterTextContent)
        tabFilterCliked.push(filterTextContent)

        filterClicked = filterTextContent
        algoFilter();
        liListener()

    } else if(filterClassName == "appliancesColor") {
        innerFilter.innerHTML += '<h3 class="appliancesColor">'+filterTextContent+' <span> x </span></h3>'
        //console.log(filterTextContent)
        numberOfFilter++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterAppliances.push(filterTextContent)
        tabFilterCliked.push(filterTextContent)

        filterClicked = filterTextContent

        algoFilter();
        liListener();

    } else if(filterClassName == "ingredientsColor") {
        innerFilter.innerHTML += '<h3 class="ingredientsColor">'+filterTextContent+' <span> x </span></h3>'
        //console.log(filterTextContent)
        numberOfFilter++;

        tabFilterUstensils = []
        tabFilterAppliances = []
        tabFilterIngredients = []

        tabFilterIngredients.push(filterTextContent)
        tabFilterCliked.push(filterTextContent)

        filterClicked = filterTextContent

        algoFilter();
        liListener();

    }
 
    const Span = document.querySelectorAll("span")
    
    for (i = 0; i < Span.length; i++) { //part for remove filters
        Span[i].addEventListener("click", removeFilter)
    }
}

/********************************Classical start of the algo********************/
let filterClicked;

function algoFilter() {

    article.innerHTML = ""
    checkTypeOfFilter()
    algoFilterRecipes()
    algoAddUstensilsFilter()
    algoAddApplianceFilter();
    algoAddIngredientFilter()

    tabFilterAttribute = 0;
}

let tabFilterAttribute = 0;

function checkTypeOfFilter() {
    //console.log(numberOfFilter)
    //console.log(filterClicked)

    if (numberOfFilter == 1) {
        
        tabRecipes.forEach(element => {
            if (element.ustensils.includes(filterClicked)) {

                const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                tabFilter.push(CardRecipe);
    
            } else if (element.appliance.includes(filterClicked)) {
            
                const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                tabFilter.push(CardRecipe);
        
            }
            
            element.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.includes(filterClicked)) {
                    
                    const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                    tabFilter.push(CardRecipe);
    
                }
            })
        })
    } else if (numberOfFilter > 1) {
        tabFilter.forEach(element => {
            if (element.ustensils.includes(filterClicked)) {

                if (tabFilterAttribute == 0) {
                    tabFilter = [];
                    tabFilterAttribute++;
                }

                const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                tabFilter.push(CardRecipe);
    
            } else if (element.appliance.includes(filterClicked)) {

                if (tabFilterAttribute == 0) {
                    tabFilter = [];
                    tabFilterAttribute++;
                }
            
                const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                tabFilter.push(CardRecipe);
        
            }
            
            element.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.includes(filterClicked)) {

                    if (tabFilterAttribute == 0) {
                        tabFilter = [];
                        tabFilterAttribute++;
                    }
                    
                    const CardRecipe = new SearchFilter(element.name, element.time, element.description, element.ingredients, element.x, element.appliance, element.ustensils);
                    tabFilter.push(CardRecipe);
    
                }
            })
        })
    }
}



/******************************Add NEW RECIPE WITH FILTER***********************/

function algoFilterRecipes() {

    const maptabFilter = tabFilter.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    maptabFilter.forEach(e => innerFilterRecipe(e))

    tabFilter.forEach(e => catchUlFilter(e)) 
}

function innerFilterRecipe(e) {

    article.innerHTML += e;
}

function catchUlFilter(e) {

    if (document.querySelector("#ul"+e.x+"")) {
        ul = document.querySelector("#ul"+e.x+"")
        e.ingredients.forEach(el => innerUlFilter(el))
    }
}

function innerUlFilter(el) {

    ul.innerHTML += '<li>'+el.ingredient+'</li>'
}
/*********************************************************************************/
/********************************Add NEW FILTER IN DROPDOWN***********************/


/*********************************Refresh ustensils filter************************/
function algoAddUstensilsFilter() {

    filterUstensils.innerHTML = ""

    tabFilter.forEach(e => e.ustensils.forEach(ustensils => innerFilterUstensils(ustensils)))

}

function innerFilterUstensils(ustensils) {

    if (tabFilterUstensils.includes(ustensils) || tabFilterCliked.includes(ustensils)) {
        
    } else {
        filterUstensils.innerHTML += '<li class="ustensilsClass">'+ustensils+'</li>'
        tabFilterUstensils.push(ustensils)
    }
}

/********************************Refresh appliances filter***********************/

function algoAddApplianceFilter() {

    filterAppliance.innerHTML = ""

    tabFilter.forEach(e => innerFilterAppliances(e))

}

function innerFilterAppliances(e) {

    if (tabFilterAppliances.includes(e.appliance) || tabFilterCliked.includes(e.appliance)) {
        
    } else {
        filterAppliance.innerHTML += '<li class="applianceClass">'+e.appliance+'</li>'
        tabFilterAppliances.push(e.appliance)
    }
}

/******************************Refresh ingredients filter************************/

function algoAddIngredientFilter() {

    filterIngredients.innerHTML = ""

    tabFilter.forEach(e => e.ingredients.forEach(ingredients => innerFilterIngredients(ingredients)))

}

function innerFilterIngredients(ingredients) {

    if (tabFilterIngredients.includes(ingredients.ingredient) || tabFilterCliked.includes(ingredients.ingredient)) {

    } else {
        filterIngredients.innerHTML += '<li class="ingredientClass">'+ingredients.ingredient+'</li>'
        tabFilterIngredients.push(ingredients.ingredient)
    }
}


/*******************************Search algo in filter dropdown*********************/
/**********************************************************************************/
//Algo Ingredients Input

let tabInputFilterSearch = []

function searchAlgoFilterDropdownIngredients(inputIngredients) {

    dropdownCheckNumberInputIngredients(inputIngredients)
    removeAllInnerRecipesDropDownIngredients(inputIngredients)
    refreshPageDropdownIngredients(inputIngredients)
}

function dropdownCheckNumberInputIngredients(inputIngredients) {
    
    if (inputIngredients.value.length >= 3) {
        
        article.innerHTML = ""
        filterIngredients.innerHTML = ""
        filterAppliance.innerHTML = ""
        filterUstensils.innerHTML = ""
        tabInnerFilterWithSearch = []
        tabInputFilterSearch = [];

        algoFunctionnalRecipesDropdownIngredients(inputIngredients);
        liListener();
    }
}

function removeAllInnerRecipesDropDownIngredients(inputIngredients) {

    if (inputIngredients.value.length < 3 && filterOn == 0) {
        while (article.firstChild) {
            article.removeChild(article.firstChild);
          }
          while (filterIngredients.firstChild) {
            filterIngredients.removeChild(filterIngredients.firstChild);
          }
          while (filterAppliance.firstChild) {
            filterAppliance.removeChild(filterAppliance.firstChild);
          }
          while (filterUstensils.firstChild) {
            filterUstensils.removeChild(filterUstensils.firstChild);
          }
    }
    
}

function refreshPageDropdownIngredients(inputIngredients) {

    if (inputIngredients.value.length == 0 && filterOn == 0) {
        tabRecipes = [];
        tabFilterLoading = [];

        app.main()
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();
    }
}

function algoFunctionnalRecipesDropdownIngredients(inputIngredients) {

    let filterTab = []
    
    if (filterOn == 0) {
        
        tabRecipes.forEach(e => {
            let i = 0;

            e.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.toLowerCase().includes(inputIngredients.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    tabInputFilterSearch.push(ingredients.ingredient)
                }
            })
        })
    } else {
        tabFilter.forEach(e => {
            let i = 0;
    
            e.ingredients.forEach(ingredients => {
                if (ingredients.ingredient.toLowerCase().includes(inputIngredients.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    tabInputFilterSearch.push(ingredients.ingredient)
                }
            })
        })
    }

    

    const mapfilterTab = filterTab.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    mapfilterTab.forEach(e => innerRecipe(e))

    tabRecipes.forEach(e => catchUl(e))

    /*****************************Filters**********************************/

    filterTab.forEach(e => innerAppliances(e))
    filterTab.forEach(e => e.ustensils.forEach(ustensils => innerUstensils(ustensils)))
    tabInputFilterSearch.forEach(ingredients => innerIngredientsFilterInput(ingredients))

}

function innerIngredientsFilterInput(ingredients) {

    if (tabInnerFilterWithSearch.includes(ingredients)) {

    } else {
        filterIngredients.innerHTML += '<li class="ingredientClass">'+ingredients+'</li>';
        tabInnerFilterWithSearch.push(ingredients)
    }

    
}

//Algo Appliance Input

//let tabInputFilterSearch = []

function searchAlgoFilterDropdownAppliances(inputAppliances) {

    dropdownCheckNumberInputAppliances(inputAppliances)
    removeAllInnerRecipesDropDownAppliances(inputAppliances)
    refreshPageDropdownAppliances(inputAppliances)
}

function dropdownCheckNumberInputAppliances(inputAppliances) {
    
    if (inputAppliances.value.length >= 3) {
        
        article.innerHTML = ""
        filterIngredients.innerHTML = ""
        filterAppliance.innerHTML = ""
        filterUstensils.innerHTML = ""
        tabInnerFilterWithSearch = []
        tabInputFilterSearch = [];

        algoFunctionnalRecipesDropdownAppliances(inputAppliances);
        liListener();
    }
}

function removeAllInnerRecipesDropDownAppliances(inputAppliances) {

    if (inputAppliances.value.length < 3 && filterOn == 0) {
        while (article.firstChild) {
            article.removeChild(article.firstChild);
          }
          while (filterIngredients.firstChild) {
            filterIngredients.removeChild(filterIngredients.firstChild);
          }
          while (filterAppliance.firstChild) {
            filterAppliance.removeChild(filterAppliance.firstChild);
          }
          while (filterUstensils.firstChild) {
            filterUstensils.removeChild(filterUstensils.firstChild);
          }
    }
    
}

function refreshPageDropdownAppliances(inputAppliances) {

    if (inputAppliances.value.length == 0 && filterOn == 0) {
        tabRecipes = [];
        tabFilterLoading = [];

        app.main()
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();
    }
}

function algoFunctionnalRecipesDropdownAppliances(inputAppliances) {

    let filterTab = []
    
    if (filterOn == 0) {
        
        tabRecipes.forEach(e => {
            let i = 0;
            if (e.appliance.toLowerCase().includes(inputAppliances.value.toLowerCase())) {
                filterTab.push(e)
                tabInputFilterSearch.push(e.appliance)
                i++;
            }
        })
    } else {
        tabFilter.forEach(e => {
            let i = 0;
            if (e.appliance.toLowerCase().includes(inputAppliances.value.toLowerCase())) {
                filterTab.push(e)
                tabInputFilterSearch.push(e.appliance)
                i++;
            }
        })
    }

    

    const mapfilterTab = filterTab.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    mapfilterTab.forEach(e => innerRecipe(e))

    tabRecipes.forEach(e => catchUl(e))

    /*****************************Filters**********************************/

    tabInputFilterSearch.forEach(e => innerAppliancesFilterInput(e))
    filterTab.forEach(e => e.ustensils.forEach(ustensils => innerUstensils(ustensils)))
    filterTab.forEach(e => e.ingredients.forEach(ingredients => innerIngredients(ingredients)))

}

function innerAppliancesFilterInput(e) {
    
    if (tabInnerFilterWithSearch.includes(e)) {

    } else {
        filterAppliance.innerHTML += '<li class="applianceClass">'+e+'</li>';
        tabInnerFilterWithSearch.push(e)
    }
}


//Algo Ustensils Input

//let tabInputFilterSearch = []

function searchAlgoFilterDropdownUstensils(inputUstensils) {

    dropdownCheckNumberInputUstensils(inputUstensils)
    removeAllInnerRecipesDropDownUstensils(inputUstensils)
    refreshPageDropdownUstensils(inputUstensils)
}

function dropdownCheckNumberInputUstensils(inputUstensils) {
    
    if (inputUstensils.value.length >= 3) {
        
        article.innerHTML = ""
        filterIngredients.innerHTML = ""
        filterAppliance.innerHTML = ""
        filterUstensils.innerHTML = ""
        tabInnerFilterWithSearch = []
        tabInputFilterSearch = [];

        algoFunctionnalRecipesDropdownUstensils(inputUstensils);
        liListener();
    }
}

function removeAllInnerRecipesDropDownUstensils(inputUstensils) {

    if (inputUstensils.value.length < 3 && filterOn == 0) {
        while (article.firstChild) {
            article.removeChild(article.firstChild);
          }
          while (filterIngredients.firstChild) {
            filterIngredients.removeChild(filterIngredients.firstChild);
          }
          while (filterAppliance.firstChild) {
            filterAppliance.removeChild(filterAppliance.firstChild);
          }
          while (filterUstensils.firstChild) {
            filterUstensils.removeChild(filterUstensils.firstChild);
          }
    }
    
}

function refreshPageDropdownUstensils(inputUstensils) {

    if (inputUstensils.value.length == 0 && filterOn == 0) {
        tabRecipes = [];
        tabFilterLoading = [];

        app.main()
        app.ingredientsFilter();
        app.appliancesFilter();
        app.ustensilsFilter();
    }
}

function algoFunctionnalRecipesDropdownUstensils(inputUstensils) {

    let filterTab = []
    
    if (filterOn == 0) {
        
        tabRecipes.forEach(e => {
            let i = 0;
    
            e.ustensils.forEach(ustensils => {
                if (ustensils.toLowerCase().includes(inputUstensils.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    tabInputFilterSearch.push(ustensils)
                }
            })
        })
    } else {
        tabFilter.forEach(e => {
            let i = 0;
    
            e.ustensils.forEach(ustensils => {
                if (ustensils.toLowerCase().includes(inputUstensils.value.toLowerCase()) && i == 0) {
                    filterTab.push(e)
                    tabInputFilterSearch.push(ustensils)
                }
            })
        })
    }
    

    const mapfilterTab = filterTab.map(e => '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+e.name+'</h2><h5 class="recipeTime">'+e.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul id="ul'+e.x+'"></ul></div><div class="instruction">'+e.description+'</div></div></div></article>')

    mapfilterTab.forEach(e => innerRecipe(e))

    tabRecipes.forEach(e => catchUl(e))

    /*****************************Filters**********************************/

    filterTab.forEach(e => innerAppliances(e))
    tabInputFilterSearch.forEach(e => innerUstensilsFilterInput(e))
    filterTab.forEach(e => e.ingredients.forEach(ingredients => innerIngredients(ingredients)))

}

function innerUstensilsFilterInput(e) {
    
    if (tabInnerFilterWithSearch.includes(e)) {

    } else {
        filterUstensils.innerHTML += '<li class="ustensilsClass">'+e+'</li>';
        tabInnerFilterWithSearch.push(e)
    }
}
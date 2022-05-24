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

/* Create a class with a function, this function add dynamic HTML with data JSON*/
class RecipesCard {
    constructor(profil) {
        this._profil = profil
    }

    createRecipesCard() {
        const article = document.getElementById("recipes");
        const test = document.querySelector(".test");

        /*test.innerHTML += '<li>'+this._profil.ingredients+'</li>'*/

        const recipesCard = '<article><div class="picture"></div><div class="info"><div class="recipeTitle"><h2 class="recipeName">'+this._profil.name+'</h2><h5 class="recipeTime">'+this._profil.time+' min</h5></div><div class="recipeInstruction"><div class="ingredients"><ul><li>beurre</li><li>poulet</li><li>riz</li><li>épice</li></ul></div><div class="instruction">'+this._profil.description+'</div></div></div></article>'
        
        article.innerHTML += recipesCard

        //const CardRecipes = new Game(this._profil.game, this._profil.tag);
        //tabGame.push(CardRecipes);
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
}


/**Use the Class Object everytime user load the page*/    
const app = new App();
app.main();
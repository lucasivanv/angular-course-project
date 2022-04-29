import { EventEmitter } from "@angular/core";
import { Recipe } from "./recipe-model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('A test recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg'),
        new Recipe('Another test recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg')
    ];

    getRecipes() {
        // without slice will return a pointer to recipes
        return this.recipes.slice();
    }
}
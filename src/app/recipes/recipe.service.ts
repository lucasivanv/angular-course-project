import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe-model";

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'Vegan burger',
            'A plant-based burger',
            'https://elavegan.com/wp-content/uploads/2019/09/Plant-based-burger-with-oil-free-french-fries.jpg',
            [
                new Ingredient('Plant-based burger', 1),
                new Ingredient('French Fries', 20),
            ]
        ),
        new Recipe(
            'Vegan lasagna',
            'An amazing meatless lasagna',
            'https://thehiddenveggies.com/wp-content/uploads/2020/08/vegan-lasagna-sq.jpg',
            [
                new Ingredient('Lasagna noodles', 2),
                new Ingredient('Mushrooms', 1),
            ]
        )
    ];

    constructor(private shoppingListService: ShoppingListService) {}

    getRecipes() {
        // without slice will return a pointer to recipes
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
}
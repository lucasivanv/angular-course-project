import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Recipe } from '../recipes/recipe-model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService
    ) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://angular-course-project-bd014-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe();
    }

    fetchRecipes() {
        this.http.get<Recipe[]>('https://angular-course-project-bd014-default-rtdb.firebaseio.com/recipes.json')
            .pipe(map(recipes => {
                return recipes.map(recipe => {
                    return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                })
            }))
            .subscribe(recipes => {
                this.recipesService.setRecipes(recipes);
            })
    }
}

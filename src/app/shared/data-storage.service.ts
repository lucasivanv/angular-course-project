import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe-model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
        private http: HttpClient,
        private recipesService: RecipeService,
        private authService: AuthService
    ) { }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.http.put('https://angular-course-project-bd014-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe();
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://angular-course-project-bd014-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                map(recipes => {
                    return recipes.map(recipe => {
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    })
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                })
            )
    }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
    selector: 'app-shopping-edit',
    templateUrl: './shopping-edit.component.html',
    styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    editMode: boolean = false;
    editedItemIndex: number;

    constructor(private shoppingListService: ShoppingListService) { }

    ngOnInit(): void {
        this.subscription = this.shoppingListService.startedEditing
            .subscribe((index: number) => {
                this.editMode = true;
                this.editedItemIndex = index;
            });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onAddItem(form: NgForm) {
        const value = form.value;
        const newIngredient = new Ingredient(value.name, value.amount);
        this.shoppingListService.addIngredient(newIngredient);
    }

}

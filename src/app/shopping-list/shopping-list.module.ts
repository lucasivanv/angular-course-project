import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ShoppingListComponent
            },
        ]),
        SharedModule,
        FormsModule
    ],
    exports: [
        ShoppingEditComponent,
        ShoppingListComponent
    ]
})
export class ShoppingListModule {}

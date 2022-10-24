import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthComponent } from './auth/auth.component';
import { CoreModule } from './core.module';
import { HeaderComponent } from './header/header.component';
import { RecipesModules } from './recipes/recipes.module';
import { SharedModule } from './shared/shared/shared.module';
import { ShoppingListModule } from './shopping-list/shopping.module';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        AuthComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RecipesModules,
        ShoppingListModule,
        SharedModule,
        CoreModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

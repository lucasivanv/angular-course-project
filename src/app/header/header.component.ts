import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    isAuthenticated = false;
    private userSubscription: Subscription;

    constructor(
        private dataStorageService: DataStorageService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.userSubscription = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy(): void {
        this.userSubscription.unsubscribe();
    }

    onSaveData() {
        this.dataStorageService.storeRecipes();
    }

    onFetchData() {
        this.dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this.authService.logout();
    }
}

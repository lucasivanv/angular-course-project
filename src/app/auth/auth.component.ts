import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, Subscription, throwError } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;

    private closeSubscription: Subscription;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

    ngOnDestroy(): void {
        this.closeSubscription?.unsubscribe();
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;

        const { email, password } = form.value;

        this.isLoading = true;
        let authObservable: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password)
        } else {
            authObservable = this.authService.signup(email, password)
        }

        authObservable
            .pipe(
                finalize(() => this.isLoading = false),
                catchError(errorMessage => {
                    this.showErrorAlert(errorMessage?.message);
                    return throwError(() => new Error(errorMessage));
                })
            )
            .subscribe(() => this.router.navigate(['/recipes']));
        form.reset();
    }

    private showErrorAlert(message: string) {
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(AlertComponent);
        componentRef.instance.message = message;
        this.closeSubscription = componentRef.instance.close.subscribe(() => {
            this.closeSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }
}

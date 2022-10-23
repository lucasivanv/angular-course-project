import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, Observable, throwError } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }

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
                    this.error = errorMessage?.message;
                    return throwError(() => new Error(errorMessage));
                })
            )
            .subscribe(() => this.router.navigate(['/recipes']));
        form.reset();
    }

    onHandleError() {
        this.error = null;
    }
}

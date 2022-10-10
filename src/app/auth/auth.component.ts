import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, finalize } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    isLoginMode = true;
    isLoading = false;
    error: string = null;

    constructor(
        private authService: AuthService
    ) { }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) return;

        const { email, password } = form.value;
        this.isLoading = true;

        if (this.isLoginMode) {
            // TODO
        } else {
            this.authService.signup(email, password)
                .pipe(
                    finalize(() => this.isLoading = false),
                    catchError(error => {
                        this.error = "An error occurred!"
                        throw error;
                    })
                )
                .subscribe();
        }
        form.reset();
    }
}

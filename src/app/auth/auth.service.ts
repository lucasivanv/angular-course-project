import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(
        private http: HttpClient
    ) { }

    signup(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBQN1dW8DYOY0n7MLng1qESf7eG3cl2HRQ',
            {
                email,
                password, 
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBQN1dW8DYOY0n7MLng1qESf7eG3cl2HRQ',
            {
                email,
                password, 
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError))
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unkown error occurred!';
        if (errorResponse.error && errorResponse.error.error) {
            switch(errorResponse.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "This email exists already";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "This email does not exist";
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = "This password is not correct";
                    break;
            }
        }
        return throwError(() => new Error(errorMessage));
    }
}

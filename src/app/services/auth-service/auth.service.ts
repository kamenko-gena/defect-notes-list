import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    UserCredential,
} from '@angular/fire/auth';
import { catchError, from, Observable, of, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly firebaseAuth = inject(Auth);

    registration(
        email: string,
        username: string,
        password: string,
    ): Observable<UserCredential> {
        return from(
            createUserWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            tap((response) => {
                updateProfile(response.user, { displayName: username });
            }),
        );
    }

    login(email: string, password: string): Observable<UserCredential | null> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            catchError(() => {
                return of(null);
            }),
        );
    }
}

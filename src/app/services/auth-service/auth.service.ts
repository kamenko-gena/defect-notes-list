import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    user,
    UserCredential,
} from '@angular/fire/auth';
import { catchError, from, map, Observable, of, take, tap } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user-interface';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly firebaseAuth = inject(Auth);
    private readonly user$ = user(this.firebaseAuth);

    registration(
        email: string,
        username: string,
        password: string,
    ): Observable<UserCredential | null> {
        return from(
            createUserWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            tap((response) => {
                updateProfile(response.user, { displayName: username });
            }),
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    login(email: string, password: string): Observable<UserCredential | null> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password),
        ).pipe(
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    resetPassword(email: string): Observable<void | null> {
        return from(sendPasswordResetEmail(this.firebaseAuth, email)).pipe(
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    logout(): Observable<void | null> {
        return from(signOut(this.firebaseAuth)).pipe(
            catchError(() => {
                return of(null);
            }),
        );
    }

    getCurrentUser(): Observable<UserInterface | null> {
        return this.user$.pipe(
            map((currentUser) => {
                return currentUser &&
                    currentUser.email &&
                    currentUser.displayName
                    ? {
                          email: currentUser.email,
                          username: currentUser.displayName,
                      }
                    : null;
            }),
        );
    }
}

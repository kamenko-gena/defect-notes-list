import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    UserCredential,
} from '@angular/fire/auth';
import { from, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);

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

    login(email: string, password: string): Observable<UserCredential> {
        return from(
            signInWithEmailAndPassword(this.firebaseAuth, email, password),
        );
    }
}

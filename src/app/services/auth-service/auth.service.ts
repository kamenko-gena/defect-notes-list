import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);

    registr(
        email: string,
        username: string,
        password: string
    ): Observable<void> {
        const registrPromise = createUserWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then((response) =>
            updateProfile(response.user, { displayName: username })
        );

        return from(registrPromise);
    }

    login(email: string, password: string): Observable<void> {
        const loginPromise = signInWithEmailAndPassword(
            this.firebaseAuth,
            email,
            password
        ).then(() => {});
        return from(loginPromise);
    }
}

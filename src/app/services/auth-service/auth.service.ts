import { inject, Injectable } from '@angular/core';
import {
    Auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from '@angular/fire/auth';
import { from, map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    firebaseAuth = inject(Auth);

    registration(
        email: string,
        username: string,
        password: string
    ): Observable<void> {

        return from(createUserWithEmailAndPassword(
                this.firebaseAuth,
                email,
                password
            )).pipe(
                map((response) => {updateProfile(response.user, { displayName: username });})
            );

    }

    login(email: string, password: string): Observable<void> {

        return from(signInWithEmailAndPassword(this.firebaseAuth, email, password)).pipe(
            map(() => {}));
        };
}

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

export const registerUserGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService.getCurrentUser().pipe(
        map((currentUser) => {
            return currentUser ? true : router.parseUrl('/authentication');
        }),
        take(1),
    );
};

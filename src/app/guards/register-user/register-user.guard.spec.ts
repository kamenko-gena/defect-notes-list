import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { registerUserGuard } from './register-user.guard';

describe('registerUserGuard', () => {
    const executeGuard: CanActivateFn = (...guardParameters) =>
        TestBed.runInInjectionContext(() =>
            registerUserGuard(...guardParameters),
        );

    beforeEach(() => {
        TestBed.configureTestingModule({});
    });

    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    TuiAlertModule,
    TuiAlertService,
    TuiButtonModule,
    TuiErrorModule,
} from '@taiga-ui/core';
import {
    TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
    TUI_INPUT_PASSWORD_OPTIONS,
    TUI_VALIDATION_ERRORS,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiInputPasswordModule,
} from '@taiga-ui/kit';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiButtonModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiInputModule,
        TuiInputPasswordModule,
        TuiAlertModule,
    ],
    templateUrl: './login-form.component.html',
    styleUrl: './login-form.component.less',
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Обязательное заполнение!',
                minlength: ({ requiredLength }: { requiredLength: string }) =>
                    `Минимальная длинна ${requiredLength}`,
            },
        },
        {
            provide: TUI_INPUT_PASSWORD_OPTIONS,
            useValue: {
                ...TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
                icons: {
                    hide: 'tuiIconEyeOff',
                    show: 'tuiIconEye',
                },
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
    authService = inject(AuthService);
    router = inject(Router);
    alerts = inject(TuiAlertService);

    readonly loginFormGroup = new FormGroup({
        email: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(6)],
        }),
        password: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(8)],
        }),
    });

    submitForm() {
        if (this.loginFormGroup.valid) {
            const rowForm = this.loginFormGroup.getRawValue();
            this.authService
                .login(rowForm.email!, rowForm.password!)
                .subscribe({
                    next: () => {
                        alert('Успешный вход!');
                        this.router.navigateByUrl('/');
                    },
                    error: (err) => {
                        alert(err.code);
                    },
                });
            this.loginFormGroup.reset();
        }
    }
}

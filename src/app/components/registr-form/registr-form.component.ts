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
import { passwordsMatchValidator } from 'src/app/models/passwords-match-validator';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registr-form',
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
    templateUrl: './registr-form.component.html',
    styleUrl: './registr-form.component.less',
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Обязательное заполнение!',
                minlength: ({ requiredLength }: { requiredLength: string }) =>
                    `Минимальная длинна ${requiredLength}`,
                pattern: 'Используйте только латиницу и цифры',
                passwordsMismatch: 'Пароли не совпадают!',
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
export class RegistrFormComponent {
    authService = inject(AuthService);
    router = inject(Router);
    alerts = inject(TuiAlertService);

    readonly registrationFormGroup = new FormGroup(
        {
            userName: new FormControl<string | null>('', {
                validators: [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.pattern('[A-Za-z0-9]*'),
                ],
            }),
            email: new FormControl<string | null>('', {
                validators: [Validators.required, Validators.minLength(6)],
            }),
            password: new FormControl<string | null>('', {
                validators: [Validators.required, Validators.minLength(8)],
            }),
            confirmPassword: new FormControl<string | null>(
                '',
                Validators.required,
            ),
        },
        { validators: passwordsMatchValidator() },
    );

    submitForm() {
        if (this.registrationFormGroup.valid) {
            const registrationFormValue =
                this.registrationFormGroup.getRawValue();

            const email = registrationFormValue.email ?? '';
            const userName = registrationFormValue.userName ?? '';
            const password = registrationFormValue.password ?? '';

            this.authService.registration(email, userName, password).subscribe({
                next: () => {
                    this.alerts.open('Успешная регистрация!', {
                        label: 'Успех',
                        status: 'success',
                    });
                    this.router.navigateByUrl('/');
                },
                error: (err) => {
                    alert(err.code);
                    this.alerts
                        .open('Ошбика!', {
                            label: 'Ошибка регистрации!',
                            status: 'error',
                        })
                        .subscribe();
                },
            });
            this.registrationFormGroup.reset();
        }
    }
}

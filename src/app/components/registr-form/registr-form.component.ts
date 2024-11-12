import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
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
import { take } from 'rxjs';

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
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts: TuiAlertService = inject(TuiAlertService);
    readonly loadingBtn = signal(false);

    readonly registrationFormGroup = new FormGroup(
        {
            userName: new FormControl<string | null>('', {
                validators: [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.pattern('[A-ZА-Яa-zа-я]*'),
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
        this.loadingBtn.set(true);
        if (this.registrationFormGroup.invalid) {
            this.loadingBtn.set(false);
            return;
        }

        const registrationFormValue = this.registrationFormGroup.getRawValue();
        const email = registrationFormValue.email ?? '';
        const userName = registrationFormValue.userName ?? '';
        const password = registrationFormValue.password ?? '';

        this.authService.registration(email, userName, password).subscribe({
            next: (user) => {
                if (user == null) {
                    this.alerts
                        .open('Указан неверный Email!', {
                            label: `Ошибка!`,
                            status: 'error',
                        })
                        .pipe(take(1))
                        .subscribe();
                    this.loadingBtn.set(false);
                    return;
                }

                this.alerts
                    .open('Успешная регистрация!', {
                        label: 'Успех',
                        status: 'success',
                    })
                    .pipe(take(1))
                    .subscribe();
                this.loadingBtn.set(false);
                this.router.navigateByUrl('/my-notes');
            },
        });
        this.registrationFormGroup.reset();
    }
}

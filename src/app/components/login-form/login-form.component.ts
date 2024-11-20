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
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs';

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
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private readonly alerts = inject(TuiAlertService);
    readonly loadingBtn = signal(false);

    readonly loginFormGroup = new FormGroup({
        email: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(6)],
        }),
        password: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(8)],
        }),
    });

    submitForm() {
        this.loadingBtn.set(true);
        if (this.loginFormGroup.invalid) {
            this.loadingBtn.set(false);
            return;
        }

        const loginFormValue = this.loginFormGroup.getRawValue();
        const email = loginFormValue.email ?? '';
        const password = loginFormValue.password ?? '';

        this.authService.login(email, password).subscribe({
            next: (value) => {
                if (value === null) {
                    this.alerts
                        .open('Ошибка входа', {
                            label: 'Неверный логин и(или) пароль!',
                            status: 'error',
                        })
                        .pipe(take(1))
                        .subscribe();
                    this.loadingBtn.set(false);
                    return;
                }

                this.alerts
                    .open('Успешный вход!', {
                        label: 'Подтверждено.',
                        status: 'success',
                    })
                    .pipe(take(1))
                    .subscribe();
                this.loadingBtn.set(false);
                this.loginFormGroup.reset();
                this.router.navigateByUrl('/my-notes');
            },
        });
    }
}

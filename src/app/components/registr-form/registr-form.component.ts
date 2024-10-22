import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule, TuiErrorModule } from '@taiga-ui/core';
import { TUI_INPUT_PASSWORD_DEFAULT_OPTIONS, TUI_INPUT_PASSWORD_OPTIONS, TUI_VALIDATION_ERRORS, TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule } from '@taiga-ui/kit';
import { passwordsMatchValidator } from 'src/app/models/passwords-match-validator';

@Component({
    selector: 'app-registr-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TuiButtonModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiInputModule, TuiInputPasswordModule],
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
                passwordsMismatch: 'Пароли не совпадают!'
            },
        },
        {
            provide: TUI_INPUT_PASSWORD_OPTIONS,
            useValue: {
                ...TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
                icons: {
                    hide: 'tuiIconEyeOff',
                    show: 'tuiIconEye',
                }
            },
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrFormComponent {

    readonly registrFormGroup = new FormGroup({
        login: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(6), Validators.pattern('[A-Za-z0-9]*')]
        }),
        password: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.minLength(8)]
        }),
        confirmPassword: new FormControl<string | null>('', Validators.required),
        
    }, {validators: passwordsMatchValidator()}
    );

    submitForm() {
        console.log('Submit login form');
        this.registrFormGroup.reset();
    }
}

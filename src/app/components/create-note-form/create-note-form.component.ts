import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormControl,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    TUI_VALIDATION_ERRORS,
    TuiCheckboxLabeledModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule,
    TuiInputModule,
    TuiRadioBlockModule,
    TuiSelectModule,
    TuiTextareaModule,
} from '@taiga-ui/kit';
import {
    TuiAlertModule,
    TuiAlertService,
    TuiButtonModule,
    TuiErrorModule,
    TuiGroupModule,
} from '@taiga-ui/core';
import { tuiMarkControlAsTouchedAndValidate } from '@taiga-ui/cdk';
import { SolutionDescriptValidatorDirective } from 'src/app/directives/solution-descript-validator/solution-descript-validator.directive';

@Component({
    selector: 'app-create-note-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TuiRadioBlockModule,
        TuiButtonModule,
        TuiGroupModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiCheckboxLabeledModule,
        TuiTextareaModule,
        TuiFieldErrorPipeModule,
        TuiErrorModule,
        TuiAlertModule,
        TuiInputModule,
        SolutionDescriptValidatorDirective
    ],
    templateUrl: './create-note-form.component.html',
    styleUrl: './create-note-form.component.less',
    providers: [
        {
            provide: TUI_VALIDATION_ERRORS,
            useValue: {
                required: 'Обязательное заполнение!',
                maxlength: ({ requiredLength }: { requiredLength: string }) =>
                    `Максимальная длинна символов — ${requiredLength}`,
            },
        },
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateNoteFormComponent {
    private readonly alerts: TuiAlertService = inject(TuiAlertService);

    readonly noteSection = [
        'Пожарная автоматика',
        'Охранная сигнализация',
        'Управление доступом',
        'Видеонаблюдение'
      ];

    readonly noteFormGroup = new FormGroup({
        section: new FormControl<
            | 'Пожарная автоматика'
            | 'Охранная сигнализация'
            | 'Управление доступом'
            | 'Видеонаблюдение'
            | null
        >(null, [Validators.required]),
        equipName: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.maxLength(50)],
        }),
        faultDescript: new FormControl<string | null>('', {
            validators: [Validators.required, Validators.maxLength(500)],
        }),
        solutionCheck: new FormControl<boolean>(false),
        solutionDescript: new FormControl<string | null>(null),
    });

    submitForm() {
        if (this.noteFormGroup.valid) {
            this.alerts
                .open('Заметка создана!', {
                    label: 'Готово!',
                    status: 'success',
                })
                .subscribe();
            this.noteFormGroup.reset();
        } else {
            tuiMarkControlAsTouchedAndValidate(this.noteFormGroup);
        }
    }
}

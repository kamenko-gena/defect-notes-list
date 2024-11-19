import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
} from '@angular/core';
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
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { Router } from '@angular/router';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserInterface } from 'src/app/interfaces/user-interface';

const NOTE_SECTIONS = [
    'Пожарная автоматика',
    'Охранная сигнализация',
    'Управление доступом',
    'Видеонаблюдение',
];
const CURRENT_DATE = new Date();

type NoteSections = typeof NOTE_SECTIONS;
type Section = NoteSections[number];

@Component({
    selector: 'app-create-note-form',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
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
        SolutionDescriptValidatorDirective,
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
export class CreateNoteFormComponent implements OnInit {
    private readonly alerts = inject(TuiAlertService);
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    private readonly authService = inject(AuthService);
    private readonly router = inject(Router);
    private currentUser: UserInterface | null = null;
    readonly currentDate = CURRENT_DATE;
    readonly noteSection = NOTE_SECTIONS;
    @Input() note: NoteInterface | null = null;

    readonly noteFormGroup = new FormGroup({
        section: new FormControl<Section>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        equipName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(50)],
        }),
        faultDescript: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(500)],
        }),
        isCompleted: new FormControl<boolean>(false, { nonNullable: true }),
        solutionDescript: new FormControl<string | null>(null),
    });

    ngOnInit(): void {
        if (this.note) this.noteFormGroup.patchValue(this.note);
        this.authService
            .getCurrentUser()
            .pipe(take(1))
            .subscribe((user) => {
                if (user) this.currentUser = user;
            });
    }

    submitForm() {
        if (this.noteFormGroup.invalid) {
            tuiMarkControlAsTouchedAndValidate(this.noteFormGroup);
            return;
        } else if (this.currentUser === null) return;

        const value = this.noteFormGroup.getRawValue();

        this.alerts
            .open('Заметка создана!', {
                label: 'Готово!',
                status: 'success',
            })
            .pipe(take(1))
            .subscribe();
        this.firebaseStorageService
            .addNoteToStorage({
                ...value,
                date: [
                    this.currentDate.getDate(),
                    this.currentDate.getMonth() + 1,
                    this.currentDate.getFullYear(),
                ],
                author: this.currentUser,
            })
            .subscribe();

        this.noteFormGroup.reset();
    }

    updateForm() {
        if (!this.note || this.noteFormGroup.invalid) {
            return;
        }

        this.firebaseStorageService
            .updateNote(this.note.id, this.noteFormGroup.value)
            .subscribe({
                complete: () => {
                    this.alerts
                        .open('Заметка изменена', {
                            label: 'Готово!',
                            status: 'info',
                        })
                        .pipe(take(1))
                        .subscribe();
                    this.router.navigateByUrl('/my-notes');
                },
            });
    }
}

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiBadgeModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiGroupModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { RouterLink } from '@angular/router';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { map, take } from 'rxjs';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { NotesFilterService } from 'src/app/services/notes-filter-service/notes-filter.service';

const NOTE_SECTIONS = [
    'Все',
    'Пожарная автоматика',
    'Охранная сигнализация',
    'Управление доступом',
    'Видеонаблюдение',
];

type NoteSections = typeof NOTE_SECTIONS;
type Section = NoteSections[number];

@Component({
    selector: 'app-notes-list',
    standalone: true,
    imports: [
        CommonModule,
        TuiBadgeModule,
        TuiButtonModule,
        TuiLinkModule,
        RouterLink,
        TuiTableModule,
        TuiGroupModule,
        TuiSelectModule,
        TuiDataListModule,
        TuiDataListWrapperModule,
        TuiTextfieldControllerModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent implements OnInit {
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    private readonly notesFilterService = inject(NotesFilterService);
    readonly tableColName = ['Раздел', 'Название', 'Статус', 'Дата', 'Ссылка'];
    readonly noteSection = NOTE_SECTIONS;
    private filterDataFlag = false;
    private filterComplitedFlag = false;

    notesFromFirebase = signal<NoteInterface[]>([]);

    readonly filterSectionGroup = new FormGroup({
        filterSectionName: new FormControl<Section>(''),
    });

    // Не корректно работает фильтр по Статусу.
    // Как вызывать функцию когда выбрал из списка и коикнул в другом месте

    ngOnInit(): void {
        this.firebaseStorageService
            .getNotes()
            .pipe(
                take(1),
                map((notes) =>
                    notes.sort(
                        (a, b) => Number(a.isCompleted) - Number(b.isCompleted),
                    ),
                ),
            )
            .subscribe((notes) => {
                this.notesFromFirebase.set(notes);
            });
    }

    filterData(): void {
        this.notesFilterService
            .filterByData(this.filterDataFlag, [...this.notesFromFirebase()])
            .subscribe((notes) => {
                this.notesFromFirebase.set(notes);
            });
        this.filterDataFlag = !this.filterDataFlag;
    }

    filterComplited(): void {
        this.notesFilterService
            .filterByCompleted(this.filterComplitedFlag, [
                ...this.notesFromFirebase(),
            ])
            .subscribe((notes) => {
                this.notesFromFirebase.set(notes);
            });
        this.filterComplitedFlag = !this.filterComplitedFlag;
    }

    // filterComplited(): void {
    //     const sortedNotes = [...this.notesFromFirebase()].sort((a, b) => {
    //         return this.filterStatusFlag
    //             ? Number(a.isCompleted) - Number(b.isCompleted)
    //             : Number(b.isCompleted) - Number(a.isCompleted);
    //     });
    //     this.filterStatusFlag = !this.filterStatusFlag;
    //     this.notesFromFirebase.set(sortedNotes);
    // }
}

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiAvatarModule,
    TuiBadgeModule,
    TuiDataListWrapperModule,
    TuiSelectModule,
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiLinkModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { RouterLink } from '@angular/router';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { map, take } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesFilterService } from 'src/app/services/notes-filter-service/notes-filter.service';

const FILTER_SECTION_NAME = [
    'Все',
    'Пожарная автоматика',
    'Охранная сигнализация',
    'Управление доступом',
    'Видеонаблюдение',
];

type NoteSections = typeof FILTER_SECTION_NAME;
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
        TuiAvatarModule,
        TuiTableModule,
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
    readonly tableColName = [
        'Раздел',
        'Название',
        'Статус',
        'Автор',
        'Дата',
        'Ссылка',
    ];
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    private readonly notesFilterService = inject(NotesFilterService);
    readonly filterName = FILTER_SECTION_NAME;
    private filterDataFlag = false;
    private filterComplitedFlag = false;

    readonly notesFromFirebase = signal<NoteInterface[]>([]);

    readonly filterSectionName = new FormControl<Section>('Все');

    ngOnInit(): void {
        this.getNotes();
    }

    getNotes(): void {
        this.firebaseStorageService
            .getNotes()
            .pipe(take(1))
            .subscribe((notes) => {
                this.notesFilterService
                    .filterByData(this.filterDataFlag, notes)
                    .subscribe((sortedNotes) => {
                        this.notesFromFirebase.set(sortedNotes);
                    });
                this.filterDataFlag = !this.filterDataFlag;
            });
    }

    filterByData(): void {
        this.notesFilterService
            .filterByData(this.filterDataFlag, [...this.notesFromFirebase()])
            .subscribe((notes) => {
                this.notesFromFirebase.set(notes);
            });
        this.filterDataFlag = !this.filterDataFlag;
    }

    filterByComplited(): void {
        this.notesFilterService
            .filterByCompleted(this.filterComplitedFlag, [
                ...this.notesFromFirebase(),
            ])
            .subscribe((notes) => {
                this.notesFromFirebase.set(notes);
            });
        this.filterComplitedFlag = !this.filterComplitedFlag;
    }

    filterBySection(): void {
        if (this.filterSectionName.value === 'Все') return this.getNotes();

        this.firebaseStorageService
            .getNotes()
            .pipe(
                take(1),
                map((notes) =>
                    notes.filter(
                        (note) => note.section === this.filterSectionName.value,
                    ),
                ),
            )
            .subscribe((sortedNotes) => {
                this.notesFromFirebase.set(sortedNotes);
            });
    }
}

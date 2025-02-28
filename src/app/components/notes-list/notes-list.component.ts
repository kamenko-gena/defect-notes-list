import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiAvatarModule,
    TuiBadgeModule,
    TuiSelectModule,
} from '@taiga-ui/kit';
import {
    TuiButtonModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { RouterLink } from '@angular/router';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { map, Subscription, take } from 'rxjs';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotesFilterService } from 'src/app/services/notes-filter-service/notes-filter.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';

const FILTER_SECTION_NAME = [
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
        TuiTextfieldControllerModule,
        FormsModule,
        ReactiveFormsModule,
        TuiLoaderModule,
        SearchBarComponent,
    ],
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [NotesFilterService],
})
export class NotesListComponent implements OnInit, OnDestroy {
    readonly tableColName = ['Название', 'Раздел', 'Статус', 'Автор', 'Дата'];
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    private readonly notesFilterService = inject(NotesFilterService);
    private subscription: Subscription = new Subscription();
    readonly filterName = FILTER_SECTION_NAME;
    private filterDataFlag = false;
    private filterComplitedFlag = false;

    readonly contentLoader = signal<boolean>(false);
    readonly notesFromFirebase = signal<NoteInterface[]>([]);

    readonly filterSectionName = new FormControl<Section | null>(null);

    ngOnInit(): void {
        this.getNotes();
        this.subscription = this.filterSectionName.valueChanges.subscribe(
            () => {
                this.filterBySection();
            },
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    private getNotes(): void {
        this.contentLoader.set(true);
        this.firebaseStorageService
            .getNotes()
            .pipe(take(1))
            .subscribe((notes) => {
                this.notesFilterService
                    .filterByData(this.filterDataFlag, notes)
                    .subscribe({
                        next: (sortedNotes) => {
                            this.notesFromFirebase.set(sortedNotes);
                        },
                        complete: () => {
                            this.contentLoader.set(false);
                        },
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
        if (!this.filterSectionName.value) return this.getNotes();
        this.contentLoader.set(true);

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
            .subscribe({
                next: (sortedNotes) => {
                    this.notesFromFirebase.set(sortedNotes);
                },
                complete: () => {
                    this.contentLoader.set(false);
                },
            });
    }
}

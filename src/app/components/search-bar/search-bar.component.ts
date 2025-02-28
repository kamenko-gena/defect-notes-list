import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiDropdownModule,
    TuiLinkModule,
    TuiLoaderModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {
    BehaviorSubject,
    debounceTime,
    filter,
    map,
    switchMap,
    tap,
} from 'rxjs';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-search-bar',
    standalone: true,
    imports: [
        CommonModule,
        TuiDropdownModule,
        TuiPrimitiveTextfieldModule,
        TuiTextfieldControllerModule,
        RouterLink,
        TuiLinkModule,
        TuiLoaderModule,
    ],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent implements OnInit {
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    readonly contentLoader = signal<boolean>(false);
    private readonly searchSubject$ = new BehaviorSubject<string>('');
    readonly showDropdown = signal<boolean>(false);
    readonly filteredNotes = signal<NoteInterface[] | null>(null);

    ngOnInit(): void {
        this.searchSubject$
            .pipe(
                filter((value) => value.length >= 3),
                tap(() => {
                    this.showDropdown.set(true);
                    this.contentLoader.set(true);
                }),
                debounceTime(300),
                switchMap((searchText) =>
                    this.firebaseStorageService
                        .getNotes()
                        .pipe(
                            map((notes) =>
                                notes.filter((note) =>
                                    note.equipName
                                        .toLowerCase()
                                        .includes(searchText.toLowerCase()),
                                ),
                            ),
                        ),
                ),
            )
            .subscribe((next) => {
                this.contentLoader.set(false);
                this.filteredNotes.set(next);
            });
    }

    onInputChange(value: string): void {
        if (value.length < 3) {
            this.filteredNotes.set(null);
            this.showDropdown.set(false);
        } else {
            this.searchSubject$.next(value);
        }
    }
}

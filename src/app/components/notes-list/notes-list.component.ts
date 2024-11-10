import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiLinkModule } from '@taiga-ui/core';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import { RouterLink } from '@angular/router';
import { TuiTableFiltersModule, TuiTableModule } from '@taiga-ui/addon-table';

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
        TuiTableFiltersModule,
    ],
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent implements OnInit {
    private readonly firebaseStorageService = inject(FirebaseStorageService);

    notesFromFirebase = signal<NoteInterface[]>([]);

    ngOnInit(): void {
        this.firebaseStorageService.getNotes().subscribe((notes) => {
            this.notesFromFirebase.set(notes);
        });
    }
}

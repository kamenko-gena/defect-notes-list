import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NoteInterface } from 'src/app/interfaces/note-interface';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiDialogService,
    TuiLinkModule,
    TuiRootModule,
} from '@taiga-ui/core';
import { TUI_PROMPT, TuiIslandModule, TuiPromptModule } from '@taiga-ui/kit';
import { tap } from 'rxjs';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { CreateNoteFormComponent } from 'src/app/components/create-note-form/create-note-form.component';

@Component({
    selector: 'app-my-note-page',
    standalone: true,
    imports: [
        CommonModule,
        TuiRootModule,
        TuiButtonModule,
        TuiDialogModule,
        TuiIslandModule,
        TuiPromptModule,
        TuiLinkModule,
        RouterLink,
        CreateNoteFormComponent,
    ],
    templateUrl: './my-note-page.component.html',
    styleUrl: './my-note-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotePageComponent implements OnInit {
    private readonly route = inject(ActivatedRoute);
    private readonly router = inject(Router);
    private readonly dialogs: TuiDialogService = inject(TuiDialogService);
    private readonly firebaseStorageService = inject(FirebaseStorageService);

    isEditNoteMode = signal<boolean>(false);
    foundNote!: NoteInterface;

    ngOnInit(): void {
        this.route.data.subscribe((data) => {
            if (!data['note']) {
                this.router.navigateByUrl('**');
                return;
            }
            this.foundNote = data['note'];
        });
    }

    deleteNote(): void {
        this.dialogs
            .open<boolean>(TUI_PROMPT, {
                label: 'Удалить заметку?',
                size: 's',
                data: {
                    content: `Запись о неисправности <b>${this.foundNote.equipName}</b> будет удалена!`,
                    yes: 'Да',
                    no: 'Нет',
                },
            })
            .pipe(
                tap((userAnswer) => {
                    if (userAnswer) {
                        this.firebaseStorageService
                            .removeNote(this.foundNote.id)
                            .subscribe();
                        this.router.navigateByUrl('/my-notes');
                    }
                }),
            )
            .subscribe();
    }

    editNote(): void {
        this.isEditNoteMode.set(true);
    }
}

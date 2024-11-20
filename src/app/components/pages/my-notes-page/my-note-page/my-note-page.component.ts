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
} from '@taiga-ui/core';
import {
    TUI_PROMPT,
    TuiBadgeModule,
    TuiIslandModule,
    TuiPromptModule,
} from '@taiga-ui/kit';
import { take, tap } from 'rxjs';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { CreateNoteFormComponent } from 'src/app/components/create-note-form/create-note-form.component';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-my-note-page',
    standalone: true,
    imports: [
        CommonModule,
        TuiButtonModule,
        TuiDialogModule,
        TuiIslandModule,
        TuiPromptModule,
        TuiLinkModule,
        TuiBadgeModule,
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
    private readonly dialogs = inject(TuiDialogService);
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    private readonly authService = inject(AuthService);

    readonly isEditNoteMode = signal<boolean>(false);
    readonly currentUserIsAuthor = signal<boolean>(false);
    foundNote: NoteInterface | null = null;

    ngOnInit(): void {
        this.route.data.pipe(take(1)).subscribe((data) => {
            if (!data['note']) {
                this.router.navigateByUrl('**');
                return;
            }
            this.foundNote = data['note'];
            this.authService
                .getCurrentUser()
                .pipe(take(1))
                .subscribe((receivedUser) => {
                    this.currentUserIsAuthor.set(
                        receivedUser?.email === this.foundNote?.author.email,
                    );
                });
        });
    }

    deleteNote(): void {
        if (!this.currentUserIsAuthor || !this.foundNote) return;
        const currentNote = this.foundNote;
        this.dialogs
            .open<boolean>(TUI_PROMPT, {
                label: 'Удалить заметку?',
                size: 's',
                data: {
                    content: `Запись о неисправности <b>${currentNote.equipName}</b> будет удалена!`,
                    yes: 'Да',
                    no: 'Нет',
                },
            })
            .pipe(
                tap((userAnswer) => {
                    if (userAnswer) {
                        this.firebaseStorageService
                            .removeNote(currentNote.id)
                            .subscribe();
                        this.router.navigateByUrl('/my-notes');
                    }
                }),
                take(1),
            )
            .subscribe();
    }

    editNote(): void {
        if (!this.currentUserIsAuthor) return;
        this.isEditNoteMode.set(true);
    }
}

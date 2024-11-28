import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentInterface } from 'src/app/interfaces/comment-interface';
import {
    TuiAvatarModule,
    TuiFieldErrorPipeModule,
    TuiTextareaModule,
} from '@taiga-ui/kit';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
    TuiButtonModule,
    TuiErrorModule,
    TuiLoaderModule,
} from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take } from 'rxjs';
import { UserInterface } from 'src/app/interfaces/user-interface';
import { FirebaseStorageService } from 'src/app/services/firebase-storage-service/firebase-storage.service';
import { NoteInterface } from 'src/app/interfaces/note-interface';

@Component({
    selector: 'app-comments-list',
    standalone: true,
    imports: [
        CommonModule,
        TuiTextareaModule,
        ReactiveFormsModule,
        TuiErrorModule,
        TuiFieldErrorPipeModule,
        TuiButtonModule,
        TuiLoaderModule,
        TuiAvatarModule,
    ],
    templateUrl: './comments-list.component.html',
    styleUrl: './comments-list.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsListComponent implements OnInit {
    private readonly authService = inject(AuthService);
    private readonly firebaseStorageService = inject(FirebaseStorageService);
    readonly contentLoader = signal<boolean>(false);
    readonly currentUser = signal<UserInterface | null>(null);
    readonly currentUserEmail = signal<string>('');
    readonly noteComments = signal<CommentInterface[] | null>(null);
    @Input({ required: true }) note: NoteInterface | null = null;

    readonly commentText = new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
    });

    ngOnInit(): void {
        this.contentLoader.set(true);
        if (this.note) {
            this.noteComments.set(this.note.comments ?? null);
        }
        this.authService
            .getCurrentUser()
            .pipe(take(1))
            .subscribe((user) => {
                if (user) {
                    this.currentUser.set(user);
                    this.currentUserEmail.set(user.email);
                }
            });
        this.contentLoader.set(false);
    }

    getUpdateComments(): void {
        if (this.note) {
            this.firebaseStorageService.getNoteById(this.note?.id).subscribe({
                next: (note) => {
                    this.noteComments.set(note?.comments ?? null);
                },
                complete: () => {
                    this.contentLoader.set(false);
                },
            });
        }
    }

    addComment(): void {
        if (this.commentText.invalid || !this.note) {
            return;
        }
        this.contentLoader.set(true);
        this.firebaseStorageService
            .addComment(this.note.id, {
                commentText: this.commentText.value,
                authorEmail: this.currentUser()?.email ?? 'Unknown',
                authorUsername: this.currentUser()?.username ?? 'Unknown',
            })
            .subscribe({
                complete: () => {
                    this.getUpdateComments();
                    this.commentText.reset();
                },
            });
    }

    deleteComment(index: number): void {
        if (
            !this.note ||
            this.currentUserEmail() !== this.noteComments()?.[index].authorEmail
        ) {
            return;
        }
        this.contentLoader.set(true);
        this.firebaseStorageService
            .deleteComment(this.note?.id, index)
            .subscribe({
                complete: () => {
                    this.getUpdateComments();
                },
            });
    }
}

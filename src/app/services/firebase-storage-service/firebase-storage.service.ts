import { inject, Injectable } from '@angular/core';
import {
    addDoc,
    arrayUnion,
    collection,
    collectionData,
    deleteDoc,
    doc,
    DocumentData,
    Firestore,
    updateDoc,
} from '@angular/fire/firestore';
import { catchError, from, map, Observable, of, take } from 'rxjs';
import { CommentInterface } from 'src/app/interfaces/comment-interface';
import { NoteInterface } from 'src/app/interfaces/note-interface';

type NoteInterfaceFromFormType = Omit<NoteInterface, 'id'>;

@Injectable({
    providedIn: 'root',
})
export class FirebaseStorageService {
    private readonly firestore = inject(Firestore);
    private readonly notesCollection = collection(this.firestore, 'notes');

    getNotes(): Observable<NoteInterface[]> {
        return collectionData(this.notesCollection, {
            idField: 'id',
        }) as Observable<NoteInterface[]>;
    }

    getNoteById(noteId: string): Observable<NoteInterface | null> {
        return this.getNotes().pipe(
            map(
                (notes: NoteInterface[]) =>
                    notes.find((note) => note.id === noteId) || null,
            ),
            take(1),
        );
    }

    addNoteToStorage(
        noteToCreate: NoteInterfaceFromFormType,
    ): Observable<string | null> {
        return from(addDoc(this.notesCollection, noteToCreate)).pipe(
            map((response) => response.id),
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    removeNote(noteId: string): Observable<void | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);
        return from(deleteDoc(docRef)).pipe(
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    updateNote(noteId: string, dataToUpdate: object): Observable<void | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);
        return from(updateDoc(docRef, dataToUpdate)).pipe(
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    addComment(
        noteId: string,
        comment: CommentInterface,
    ): Observable<void | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);
        return from(
            updateDoc(docRef, {
                comments: arrayUnion(comment),
            }),
        ).pipe(
            catchError(() => {
                return of(null);
            }),
            take(1),
        );
    }

    deleteComment(
        noteId: string,
        index: number,
    ): Observable<DocumentData | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);

        return this.getNoteById(noteId).pipe(
            map((note) => {
                if (!note || !note.comments || index >= note.comments.length) {
                    return of(null);
                }
                const updatedComments = note.comments.filter(
                    (_, i) => i !== index,
                );
                return from(updateDoc(docRef, { comments: updatedComments }));
            }),
            take(1),
            catchError(() => {
                return of(null);
            }),
        );
    }
}

import { inject, Injectable } from '@angular/core';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    updateDoc,
} from '@angular/fire/firestore';
import { catchError, from, map, Observable, of } from 'rxjs';
import { NoteInterface } from 'src/app/interfaces/note-interface';

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
        );
    }

    addNoteToStorage(noteToCreate: NoteInterface): Observable<string | null> {
        return from(addDoc(this.notesCollection, noteToCreate)).pipe(
            map((response) => response.id),
            catchError(() => {
                return of(null);
            }),
        );
    }

    removeNote(noteId: string): Observable<void | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);
        return from(deleteDoc(docRef)).pipe(
            catchError(() => {
                return of(null);
            }),
        );
    }

    updateNote(noteId: string, dataToUpdate: object): Observable<void | null> {
        const docRef = doc(this.firestore, 'notes/' + noteId);
        return from(updateDoc(docRef, dataToUpdate)).pipe(
            catchError(() => {
                return of(null);
            }),
        );
    }
}
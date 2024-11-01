import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NoteInterface } from 'src/app/interfaces/note-interface';

@Injectable({
    providedIn: 'root',
})
export class LocalStorageService {
    private readonly storageKey = 'notesList';

    fetchData(): Observable<NoteInterface[]> {
        const notes = localStorage.getItem(this.storageKey);
        return of(notes ? JSON.parse(notes) : []);
    }
    addNote(note: NoteInterface): void {
        const notes = this.getNotesFromStorage();
        notes.push(note);
        localStorage.setItem(this.storageKey, JSON.stringify(notes));
    }

    private getNotesFromStorage(): NoteInterface[] {
        const notes = localStorage.getItem(this.storageKey);
        return notes ? JSON.parse(notes) : [];
    }
}

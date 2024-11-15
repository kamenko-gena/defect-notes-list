import { Injectable } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { NoteInterface } from 'src/app/interfaces/note-interface';

@Injectable({
    providedIn: 'root',
})
export class NotesFilterService {
    filterByData(
        earlyFirst: boolean,
        notes: NoteInterface[],
    ): Observable<NoteInterface[]> {
        const sortedNotes = notes.sort((a, b) => {
            const dateA = new Date(a.date[2], a.date[1] - 1, a.date[0]);
            const dateB = new Date(b.date[2], b.date[1] - 1, b.date[0]);
            return earlyFirst
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime();
        });
        return of(sortedNotes).pipe(take(1));
    }

    filterByCompleted(
        completedFirst: boolean,
        notes: NoteInterface[],
    ): Observable<NoteInterface[]> {
        const sortedNotes = notes.sort((a, b) => {
            return completedFirst
                ? Number(a.isCompleted) - Number(b.isCompleted)
                : Number(b.isCompleted) - Number(a.isCompleted);
        });
        return of(sortedNotes).pipe(take(1));
    }
}

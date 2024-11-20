import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { NoteInterface } from '../interfaces/note-interface';
import { FirebaseStorageService } from '../services/firebase-storage-service/firebase-storage.service';
import { inject } from '@angular/core';

export const noteIdResolver: ResolveFn<NoteInterface | null> = (
    route: ActivatedRouteSnapshot,
) => {
    const noteId = route.paramMap.get('noteId');
    return noteId ? inject(FirebaseStorageService).getNoteById(noteId) : null;
};

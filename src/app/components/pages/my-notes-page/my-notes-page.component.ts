import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from '../../notes-list/notes-list.component';

@Component({
    selector: 'app-my-notes-page',
    standalone: true,
    imports: [CommonModule, NotesListComponent],
    templateUrl: './my-notes-page.component.html',
    styleUrl: './my-notes-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotesPageComponent {}

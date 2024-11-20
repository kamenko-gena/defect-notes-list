import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNoteFormComponent } from 'src/app/components/create-note-form/create-note-form.component';

@Component({
    selector: 'app-my-notes-create-page',
    standalone: true,
    imports: [CommonModule, CreateNoteFormComponent],
    templateUrl: './my-notes-create-page.component.html',
    styleUrl: './my-notes-create-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotesCreatePageComponent {}

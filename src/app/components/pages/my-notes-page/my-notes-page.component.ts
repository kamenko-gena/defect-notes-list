import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-my-notes-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './my-notes-page.component.html',
    styleUrl: './my-notes-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotesPageComponent {}

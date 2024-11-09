import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotesListComponent } from '../../notes-list/notes-list.component';
import { TuiAlertModule, TuiLinkModule, TuiRootModule } from '@taiga-ui/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-my-notes-page',
    standalone: true,
    imports: [
        CommonModule,
        NotesListComponent,
        TuiRootModule,
        RouterLink,
        TuiLinkModule,
        TuiAlertModule,
    ],
    templateUrl: './my-notes-page.component.html',
    styleUrl: './my-notes-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyNotesPageComponent {}

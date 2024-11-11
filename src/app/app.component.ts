import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TuiPromptModule } from '@taiga-ui/kit';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        TuiRootModule,
        TuiAlertModule,
        TuiPromptModule,
        TuiDialogModule,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'notes-list-app';
}

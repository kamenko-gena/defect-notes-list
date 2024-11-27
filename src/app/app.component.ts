import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { TuiPromptModule } from '@taiga-ui/kit';
import { NavigationComponent } from './components/navigation/navigation/navigation.component';

@Component({
    standalone: true,
    imports: [
        RouterModule,
        TuiRootModule,
        TuiAlertModule,
        TuiPromptModule,
        TuiDialogModule,
        NavigationComponent,
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.less',
})
export class AppComponent {
    title = 'notes-list-app';
}

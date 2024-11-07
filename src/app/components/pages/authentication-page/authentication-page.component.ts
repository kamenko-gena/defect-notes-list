import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RegistrFormComponent } from '../../registr-form/registr-form.component';
import { TuiAlertModule, TuiRootModule } from '@taiga-ui/core';

@Component({
    selector: 'app-authentication-page',
    standalone: true,
    imports: [
        CommonModule,
        LoginFormComponent,
        RegistrFormComponent,
        TuiRootModule,
        TuiTabsModule,
        TuiAlertModule,
    ],
    templateUrl: './authentication-page.component.html',
    styleUrl: './authentication-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationPageComponent {
    activeTab = signal(1);

    onTabClick(tab: number): void {
        this.activeTab.set(tab);
    }
}

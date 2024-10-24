import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegistrFormComponent } from '../../registr-form/registr-form.component';

@Component({
    selector: 'app-authentication-page',
    standalone: true,
    imports: [
        CommonModule,
        LoginFormComponent,
        RegistrFormComponent,
        TuiTabsModule,
        RouterLinkActive,
        RouterOutlet,
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

import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginFormComponent } from '../../login-form/login-form.component';
import { TuiTabsModule } from '@taiga-ui/kit';
import { RegistrFormComponent } from '../../registr-form/registr-form.component';
import { TuiAlertModule, TuiAlertService, TuiRootModule } from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take } from 'rxjs';

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
export class AuthenticationPageComponent implements OnInit {
    private readonly alerts: TuiAlertService = inject(TuiAlertService);
    private readonly authService = inject(AuthService);

    readonly activeTab = signal(1);

    ngOnInit(): void {
        this.authService
            .getCurrentUser()
            .pipe(take(1))
            .subscribe((currentUser) => {
                if (currentUser) {
                    this.alerts
                        .open(
                            `Вы уже вошли под именем: <strong>${currentUser.username}</strong>`,
                            {
                                label: 'Учетная запись активна',
                                status: 'info',
                            },
                        )
                        .pipe(take(1))
                        .subscribe();
                    return;
                }

                this.alerts
                    .open(
                        'Необхоимо войти в учетную запись или создать новую.',
                        {
                            label: 'Войдите или зарегистрируйтесь!',
                            status: 'info',
                        },
                    )
                    .pipe(take(1))
                    .subscribe();
            });
    }

    onTabClick(tab: number): void {
        this.activeTab.set(tab);
    }
}

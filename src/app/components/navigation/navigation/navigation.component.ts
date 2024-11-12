import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiDialogService,
    TuiLinkModule,
} from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take, tap } from 'rxjs';
import { TUI_PROMPT, TuiPromptModule } from '@taiga-ui/kit';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-navigation',
    standalone: true,
    imports: [
        CommonModule,
        TuiLinkModule,
        TuiPromptModule,
        TuiDialogModule,
        TuiButtonModule,
        RouterModule,
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
    private readonly authService = inject(AuthService);
    private readonly dialogs: TuiDialogService = inject(TuiDialogService);
    private readonly router = inject(Router);

    logout() {
        this.dialogs
            .open<boolean>(TUI_PROMPT, {
                label: 'Выйти?',
                size: 's',
                data: {
                    content: `Выход из учетной записи.`,
                    yes: 'Да',
                    no: 'Нет',
                },
            })
            .pipe(
                tap((userAnswer) => {
                    if (userAnswer) {
                        this.authService.logout().pipe(take(1)).subscribe();
                        this.router.navigateByUrl('/');
                    }
                }),
                take(1),
            )
            .subscribe();
    }
}

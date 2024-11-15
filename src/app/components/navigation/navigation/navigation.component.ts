import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnDestroy,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    TuiButtonModule,
    TuiDialogModule,
    TuiDialogService,
    TuiLinkModule,
} from '@taiga-ui/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Subscription, take, tap } from 'rxjs';
import {
    TUI_PROMPT,
    TuiAvatarModule,
    tuiAvatarOptionsProvider,
    TuiPromptModule,
} from '@taiga-ui/kit';
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
        TuiAvatarModule,
    ],
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        tuiAvatarOptionsProvider({
            size: 'm',
            autoColor: true,
        }),
    ],
})
export class NavigationComponent implements OnInit, OnDestroy {
    private readonly authService = inject(AuthService);
    private readonly dialogs: TuiDialogService = inject(TuiDialogService);
    private readonly router = inject(Router);
    private subscription: Subscription = new Subscription();
    readonly currentUserName = signal<string>('');

    ngOnInit(): void {
        this.subscription = this.authService.getCurrentUser().subscribe({
            next: (currentUser) => {
                if (!currentUser) {
                    this.currentUserName.set('');
                    return;
                }
                this.currentUserName.set(currentUser.username);
            },
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    logout(): void {
        if (!this.currentUserName()) {
            return;
        }
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

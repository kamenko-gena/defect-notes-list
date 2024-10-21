import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-authentication-page',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './authentication-page.component.html',
    styleUrl: './authentication-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationPageComponent {}

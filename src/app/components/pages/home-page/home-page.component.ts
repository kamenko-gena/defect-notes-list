import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, TuiButtonModule, RouterModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {}

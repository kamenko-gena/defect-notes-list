import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatusModule } from '@taiga-ui/layout';

@Component({
    selector: 'app-not-found-page',
    standalone: true,
    imports: [CommonModule, TuiBlockStatusModule],
    templateUrl: './not-found-page.component.html',
    styleUrl: './not-found-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {}

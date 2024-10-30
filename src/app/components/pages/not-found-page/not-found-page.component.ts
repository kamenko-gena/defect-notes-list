import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatusModule } from '@taiga-ui/layout';
import { TuiSvgModule } from '@taiga-ui/core';
import { DomSanitizer } from '@angular/platform-browser';
import { notFoundPageSvg } from './not-found-page-svg';

@Component({
    selector: 'app-not-found-page',
    standalone: true,
    imports: [CommonModule, TuiBlockStatusModule, TuiSvgModule],
    templateUrl: './not-found-page.component.html',
    styleUrl: './not-found-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
    private readonly domSanitizer = inject(DomSanitizer);

    bypassNotFoundPageSvg =
        this.domSanitizer.bypassSecurityTrustHtml(notFoundPageSvg);
}

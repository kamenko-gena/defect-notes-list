import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiBlockStatusModule } from '@taiga-ui/layout';
import { TuiSvgModule } from '@taiga-ui/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-not-found-page',
    standalone: true,
    imports: [CommonModule, TuiBlockStatusModule, TuiSvgModule],
    templateUrl: './not-found-page.component.html',
    styleUrl: './not-found-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent implements OnInit {
    private readonly domSanitizer = inject(DomSanitizer);
    private readonly httpClient = inject(HttpClient);

    notFoundPageImg: SafeHtml = '';

    // constructor(
    //     private httpClient: HttpClient,
    //     private domSanitizer: DomSanitizer,
    // ) {}

    ngOnInit(): void {
        this.httpClient
            .get(`assets/not-found-page.svg`, {
                responseType: 'text',
            })
            .subscribe((value) => {
                this.notFoundPageImg =
                    this.domSanitizer.bypassSecurityTrustHtml(value);
            });
        this.notFoundPageImg = 'assets/not-found-page.svg';
            // .subscribe({
            //     next: (value) => {
            //         this.notFoundPageImg = this.domSanitizer.bypassSecurityTrustHtml(value);
            //         console.log('Получены данные:', this.notFoundPageImg);
            //     },
            //     error: (error) => {
            //         console.error('Ошибка загрузки:', error);
            //     },
            //     complete: () => {
            //         console.log('Загрузка завершена', this.notFoundPageImg);
            //     }
            // })
    }

    // notFoundPageImg =
    //     this.domSanitizer.bypassSecurityTrustHtml(notFoundPageSvg);
}
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [CommonModule, TuiSvgModule, TuiButtonModule, RouterModule],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    private readonly domSanitizer = inject(DomSanitizer);
    private readonly httpClient = inject(HttpClient);
    readonly welcomeImg = signal<SafeHtml>('');

    ngOnInit(): void {
        this.httpClient
            .get(`assets/welcome.svg`, {
                responseType: 'text',
            })
            .pipe(take(1))
            .subscribe((value) => {
                this.welcomeImg.set(
                    this.domSanitizer.bypassSecurityTrustHtml(value),
                );
            });
    }
}

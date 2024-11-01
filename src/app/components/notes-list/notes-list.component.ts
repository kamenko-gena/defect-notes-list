import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';
import { TuiAccordionModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
    selector: 'app-notes-list',
    standalone: true,
    imports: [
        CommonModule,
        TuiAccordionModule,
        TuiBadgeModule,
        TuiButtonModule,
    ],
    templateUrl: './notes-list.component.html',
    styleUrl: './notes-list.component.less',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesListComponent {
    private readonly localStorageService = inject(LocalStorageService);

    readonly notes$ = this.localStorageService.fetchData();
}

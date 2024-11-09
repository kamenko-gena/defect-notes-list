import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyNotePageComponent } from './my-note-page.component';

describe('MyNotePageComponent', () => {
    let component: MyNotePageComponent;
    let fixture: ComponentFixture<MyNotePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyNotePageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyNotePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

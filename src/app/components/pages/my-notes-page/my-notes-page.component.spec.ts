import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyNotesPageComponent } from './my-notes-page.component';

describe('MyNotesPageComponent', () => {
    let component: MyNotesPageComponent;
    let fixture: ComponentFixture<MyNotesPageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyNotesPageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyNotesPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

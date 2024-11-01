import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyNotesCreatePageComponent } from './my-notes-create-page.component';

describe('MyNotesCreatePageComponent', () => {
    let component: MyNotesCreatePageComponent;
    let fixture: ComponentFixture<MyNotesCreatePageComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MyNotesCreatePageComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(MyNotesCreatePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

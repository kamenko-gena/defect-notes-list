import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrFormComponent } from './registr-form.component';

describe('RegistrFormComponent', () => {
    let component: RegistrFormComponent;
    let fixture: ComponentFixture<RegistrFormComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RegistrFormComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(RegistrFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

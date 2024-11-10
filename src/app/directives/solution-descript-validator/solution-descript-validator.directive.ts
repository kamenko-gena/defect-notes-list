import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Directive({
    selector: '[appSolutionDescriptValidator]',
    standalone: true,
})
export class SolutionDescriptValidatorDirective implements OnInit {
    @Input({ required: true }) isCompletedControl!: AbstractControl;
    @Input({ required: true }) solutionDescriptControl!: FormControl;

    ngOnInit() {
        this.isCompletedControl.valueChanges.subscribe((isChecked: boolean) => {
            isChecked
                ? this.solutionDescriptControl.setValidators([
                      Validators.required,
                      Validators.maxLength(500),
                  ])
                : this.solutionDescriptControl.clearValidators();
            this.solutionDescriptControl.updateValueAndValidity();
        });
    }
}

import { Directive, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Directive({
    selector: '[appSolutionDescriptValidator]',
    standalone: true,
})
export class SolutionDescriptValidatorDirective implements OnInit {
    @Input() solutionCheckControl!: AbstractControl;
    @Input() solutionDescriptControl!: FormControl;

    ngOnInit() {
        this.solutionCheckControl.valueChanges.subscribe(
            (isChecked: boolean) => {
                if (isChecked) {
                    this.solutionDescriptControl.setValidators([
                        Validators.required,
                        Validators.maxLength(500),
                    ]);
                } else {
                    this.solutionDescriptControl.clearValidators();
                }
                this.solutionDescriptControl.updateValueAndValidity();
            }
        );
    }
}

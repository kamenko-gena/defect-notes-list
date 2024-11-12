import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Directive({
    selector: '[appSolutionDescriptValidator]',
    standalone: true,
})
export class SolutionDescriptValidatorDirective implements OnInit, OnDestroy {
    @Input({ required: true }) isCompletedControl!: AbstractControl;
    @Input({ required: true }) solutionDescriptControl!: FormControl;

    private subscription: Subscription = new Subscription();

    ngOnInit() {
        this.subscription = this.isCompletedControl.valueChanges.subscribe(
            (isChecked: boolean) => {
                isChecked
                    ? this.solutionDescriptControl.setValidators([
                          Validators.required,
                          Validators.maxLength(500),
                      ])
                    : this.solutionDescriptControl.clearValidators();
                this.solutionDescriptControl.updateValueAndValidity();
            },
        );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}

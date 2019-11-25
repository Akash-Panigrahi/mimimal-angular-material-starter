import { ValidatorFn, ValidationErrors, FormControl } from '@angular/forms';

export function equateField(matchTo: string, errorKey: string): ValidatorFn {
    return (control: FormControl): ValidationErrors | null => {
        return !!control.parent &&
            control.value &&
            control.value !== control.parent.controls[matchTo].value
            ? { [errorKey]: true }
            : null;
    };
}

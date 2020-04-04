import { FormGroup } from '@angular/forms';

export function mustNotMatchIfNotEmpty(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      return;
    }

    if (!controlName || !matchingControl.value) {
      matchingControl.setErrors(null);
    } else if (control.value === matchingControl.value) {
      matchingControl.setErrors({ mustNotMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

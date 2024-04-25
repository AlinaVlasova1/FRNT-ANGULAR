import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createPasswordStrengthValidators(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = /[0-9]+/.test(value);
    const hasSimbols = /[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/.test(value);
    const passwordValid = hasUpperCase && hasLowerCase && hasNumeric && hasSimbols;
    return !passwordValid ? { passwordStrength: true}: null;
  }
}

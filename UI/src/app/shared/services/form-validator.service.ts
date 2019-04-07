import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GeneralFormControlName} from '../enums/general-form-control-name.enum';
import {FormErrorMessage} from '../enums/form-error-message.enum';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {
  public isInvalidAndTouched(form: FormGroup, formControlName: GeneralFormControlName): boolean {
    return !form.get(formControlName).valid && form.get(formControlName).touched;
  }

  public nameError(form: FormGroup): string {
    console.log(form);
    if (form.get(GeneralFormControlName.Name).errors['required']) {
      return FormErrorMessage.Required;
    }

    if (form.get(GeneralFormControlName.Name).errors['maxlength']) {
      return FormErrorMessage.MaxLenght;
    }

    return '';
  }

  public emailError(form: FormGroup): string {
    if (form.get(GeneralFormControlName.Email).errors['required']) {
      return FormErrorMessage.Required;
    }

    if (form.get(GeneralFormControlName.Email).errors['email']) {
      return FormErrorMessage.Email;
    }
    return '';
  }
}

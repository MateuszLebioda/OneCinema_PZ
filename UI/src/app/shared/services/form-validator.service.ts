import {Injectable} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import validator from 'validator';
import {SharedServicesModule} from '../shared-services.module';

@Injectable({
  providedIn: SharedServicesModule
})
export class FormValidatorService {
  public isInvalid(form: FormGroup, formControlName: string): boolean {
    return !form.get(formControlName).valid;
  }

  public isInvalidAndTouched(form: FormGroup, formControlName: string): boolean {
    return !form.get(formControlName).valid && form.get(formControlName).touched;
  }

  public isUrl(control: FormControl): { [s: string]: boolean } {
    if (control.value && !validator.isURL(control.value)) {
      return {'url': true};
    }

    return null;
  }
}

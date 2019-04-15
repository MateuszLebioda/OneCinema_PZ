import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../shared/services/form-validator.service';
import {AdminServicesModule} from '../../../admin-services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class AddMovieService {
  private formValidatorService: FormValidatorService;

  constructor() {
    this.formValidatorService = new FormValidatorService();
  }

  public getForm(): FormGroup {
    const form = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'gender': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'duration': new FormControl(null, [Validators.required]),
      'rate': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
      'posterUrl': new FormControl(null, [Validators.required, this.formValidatorService.isUrl.bind(this)]),
      'trailerUrl': new FormControl(null, [Validators.required, this.formValidatorService.isUrl.bind(this)])
    });
    this._setMovieProjectionFormGroup(form);

    return form;
  }

  private _setMovieProjectionFormGroup(form: FormGroup): void {
    form.addControl('movieProjection', new FormGroup({
      'weeksCount': new FormControl(null, [Validators.required]),
    }));
  }
}

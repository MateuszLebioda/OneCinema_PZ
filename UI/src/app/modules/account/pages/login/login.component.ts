import {Component, OnInit} from '@angular/core';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public get formControls() {
    return this.form.controls;
  }

  public form: FormGroup;

  constructor(
    private _formValidatorService: FormValidatorService) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      'login': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required]),
    });
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.form, formControlName);
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }

  public onSubmit(): void {
    if (this.isFormValid()) {
      console.log('xd');
    }
  }
}

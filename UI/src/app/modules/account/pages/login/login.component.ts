import {Component, OnInit} from '@angular/core';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import {Router} from '@angular/router';
import {NotificationService} from '../../../../core/services/notification.service';
import {LocalStorageKey} from '../../../../core/enums/local-storage-key';

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
    private _router: Router,
    private _notificationService: NotificationService,
    private _formValidatorService: FormValidatorService,
    private _authService: AuthenticationService) {
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
      const login = this.form.get('login').value;
      const password = this.form.get('password').value;
      this._authService.login(login, password)
        .then(userCredencial => {
          userCredencial.user.getIdToken().then(token => {
            localStorage.setItem(LocalStorageKey.AuthToken, token);
            this._router.navigate(['/admin/panel']);
          });
        })
        .catch(err => this._notificationService.showError(err.message));
    }
  }
}

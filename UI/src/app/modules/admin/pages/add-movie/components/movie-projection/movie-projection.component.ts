import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-movie-projection',
  templateUrl: './movie-projection.component.html',
  styleUrls: ['./movie-projection.component.css', '../../add-movie.component.css']
})
export class MovieProjectionComponent implements OnInit {
  public bookingForm: FormGroup;

  public get formControls() {
    return this.bookingForm.controls;
  }

  constructor(
    private controlContainer: ControlContainer,
    private _formValidatorService: FormValidatorService,
    private ref: ChangeDetectorRef,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = <FormGroup>this.controlContainer.control;
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }
}

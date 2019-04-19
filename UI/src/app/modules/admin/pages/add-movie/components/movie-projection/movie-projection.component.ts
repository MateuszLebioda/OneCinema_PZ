import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {MovieProjectionService} from './services/movie-projection.service';
import {AddMovieApiModel} from './api-models/add-movie-api.model';

@Component({
  selector: 'app-movie-projection',
  templateUrl: './movie-projection.component.html',
  styleUrls: ['./movie-projection.component.css', '../../add-movie.component.css']
})
export class MovieProjectionComponent implements OnInit {
  public get formControls() {
    return this.bookingForm.controls;
  }

  public get weekCount(): number {
    if (!this.bookingForm.get('weeksCount').value && !isNaN(this.bookingForm.get('weeksCount').value)) {
      return 0;
    }
    this.addMovieApiModel = new AddMovieApiModel();
    this.addMovieApiModel.weeks = new Array(this.bookingForm.get('weeksCount').value);

    return this.bookingForm.get('weeksCount').value;
  }

  public bookingForm: FormGroup;
  public addMovieApiModel: AddMovieApiModel;

  constructor(
    private _controlContainer: ControlContainer,
    private _formValidatorService: FormValidatorService,
    private _movieProjectionService: MovieProjectionService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = <FormGroup>this._controlContainer.control;
    this.bookingForm.get('weeksCount').setValue(1); //USUNĄC
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }
}

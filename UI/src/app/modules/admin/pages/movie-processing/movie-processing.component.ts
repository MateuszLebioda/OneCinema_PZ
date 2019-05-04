import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieProcessingService} from './services/movie-processing.service';
import {MovieGenderTranslateModel} from './models/movie-gender-translate.model';
import {IMultipleSelectDropdownSettings} from '../../../../shared/components/external/multiple-select-dropdown/interfaces/i-multiple-select-dropdown-settings';

@Component({
  selector: 'app-movie-processing',
  templateUrl: './movie-processing.component.html',
  styleUrls: ['./movie-processing.component.css', '../../admin.component.css']
})
export class MovieProcessingComponent implements OnInit {
  public get formControls() {
    return this.bookingForm.controls;
  }

  public get rate(): null {
    return this.bookingForm.get('rate').value;
  }

  public bookingForm: FormGroup;
  public genders: MovieGenderTranslateModel[] = [];
  public selectedGenders: MovieGenderTranslateModel[] = [];
  public settings: IMultipleSelectDropdownSettings;

  private _movieId: string;
  private clickedGenderSelector = false;

  constructor(
    private _formValidatorService: FormValidatorService,
    private _addMovieService: MovieProcessingService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this._movieId = this.route.snapshot.params.movieId;
    this.bookingForm = this._addMovieService.getForm(this._movieId);
    this.settings = this._addMovieService.getMultiselectDropdownComponentSettings();
    this.genders = this._addMovieService.getGenders();
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }

  public isInvalidGenderSelector(): boolean {
    return this.clickedGenderSelector && this.selectedGenders.length <= 0;
  }

  public markGenderSelectorAsClicked(): void {
    this.clickedGenderSelector = true;
  }

  public isFormValid(): boolean {
    return this._addMovieService.isFormValid(this.bookingForm, this.selectedGenders);
  }

  public onSubmit(): void {
    this._addMovieService.addMovie(this.selectedGenders, this.bookingForm);
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public valueChanged(rate: number): void {
    this.bookingForm.get('rate').setValue(rate);
  }
}

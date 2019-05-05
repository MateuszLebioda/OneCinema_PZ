import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {ActivatedRoute} from '@angular/router';
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

  public get rating(): null {
    return this.bookingForm.get('rating').value;
  }

  public bookingForm: FormGroup;
  public genders: MovieGenderTranslateModel[] = [];
  public selectedGenders: MovieGenderTranslateModel[] = [];
  public settings: IMultipleSelectDropdownSettings;

  private clickedGenderSelector = false;

  constructor(
    private _formValidatorService: FormValidatorService,
    private _addMovieService: MovieProcessingService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const movieId = this.route.snapshot.params.movieId;
    const movie = this._addMovieService.getMovie('ssss');
    this.bookingForm = this._addMovieService.getForm(movie);
    this.settings = this._addMovieService.getMultiselectDropdownComponentSettings();
    this.genders = this._addMovieService.getGenders();
    this.selectedGenders = this._addMovieService.getSelectedGendersIfMovieExisist(movie);
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
    this.bookingForm.get('rating').setValue(rate);
  }
}

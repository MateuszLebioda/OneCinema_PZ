import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {AddMovieService} from './services/add-movie.service';
import {Subject} from 'rxjs/internal/Subject';
import {MovieGenderTranslateModel} from './models/movie-gender-translate.model';
import {IMultipleSelectDropdownSettings} from '../../../../shared/components/external/multiple-select-dropdown/interfaces/i-multiple-select-dropdown-settings';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  public get formControls() {
    return this.bookingForm.controls;
  }

  public get rate(): null {
    return this.bookingForm.get('rate').value;
  }

  public bookingForm: FormGroup;
  public movieDuration: Subject<number> = new Subject();
  public genders: MovieGenderTranslateModel[] = [];
  public selectedGenders: MovieGenderTranslateModel[] = [];
  public settings: IMultipleSelectDropdownSettings;

  private clickedGenderSelector = false;

  constructor(
    private _formValidatorService: FormValidatorService,
    private _addMovieService: AddMovieService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = this._addMovieService.getForm();
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

  public onSubmit(): void {
    this._addMovieService.addMovie(this.selectedGenders, this.bookingForm);
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public valueChanged(rate: number): void {
    this.bookingForm.get('rate').setValue(rate);
  }

  public emitNewMovieDuration(): void {
    this.movieDuration.next(this.bookingForm.get('duration') ? this.bookingForm.get('duration').value : null);
  }
}

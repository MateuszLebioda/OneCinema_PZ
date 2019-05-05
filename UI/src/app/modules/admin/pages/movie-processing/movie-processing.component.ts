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
  public pageTitle = 'Dodawanie filmu';

  private clickedGenderSelector = false;

  constructor(
    private _formValidatorService: FormValidatorService,
    private _service: MovieProcessingService,
    private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const movie = this._service.getMovie(this._route.snapshot.params.movieId);
    this.bookingForm = this._service.getForm(movie);
    this.settings = this._service.getMultiselectDropdownComponentSettings();
    this.genders = this._service.getGenders();
    this.selectedGenders = this._service.getSelectedGendersIfEditMovie(movie);
    if (movie) {
      this.pageTitle = 'Edycja filmu';
    }
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
    return this._service.isFormValid(this.bookingForm, this.selectedGenders);
  }

  public onSubmit(): void {
    //TODO: zmienić (add lub edit)
    this._service.addMovie(this.selectedGenders, this.bookingForm);
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public valueChanged(rate: number): void {
    this.bookingForm.get('rating').setValue(rate);
  }
}

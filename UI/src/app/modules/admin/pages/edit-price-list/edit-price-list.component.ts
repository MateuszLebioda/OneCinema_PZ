import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {MovieGenderTranslateModel} from '../add-movie/models/movie-gender-translate.model';
import {IMultipleSelectDropdownSettings} from '../../../../shared/components/external/multiple-select-dropdown/interfaces/i-multiple-select-dropdown-settings';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {AddMovieService} from '../add-movie/services/add-movie.service';
import {Router} from '@angular/router';
import {EditPriceListApiService} from './services/edit-price-list-api.service';
import {PriceListApiModel} from '../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrls: ['./edit-price-list.component.css', '../../admin.component.css']
})
export class EditPriceListComponent implements OnInit {
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
  public priceList: PriceListApiModel = new PriceListApiModel();

  private clickedGenderSelector = false;

  constructor(
    private _formValidatorService: FormValidatorService,
    private _editPriceListApiService: EditPriceListApiService,
    private _addMovieService: AddMovieService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.priceList = this._editPriceListApiService.getPriceList();

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

import {Injectable} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../shared/services/form-validator.service';
import {AdminServicesModule} from '../../../admin-services.module';
import {TranslatorService} from '../../../../../shared/helpers/internal/translator.service';
import {MovieGenderTranslateModel} from '../models/movie-gender-translate.model';
import {MovieGender} from '../../../../movie/enums/movie-gender.enum';
import {IMultipleSelectDropdownSettings} from '../../../../../shared/components/external/multiple-select-dropdown/interfaces/i-multiple-select-dropdown-settings';
import {AddMovieRequestModel} from '../components/seance/models/requests/add-movie-request.model';
import {AddMovieWeekModel} from '../components/seance/models/add-movie-week.model';
import {AddSeanceWeekRequestModel} from '../components/seance/models/requests/add-seance-week-request.model';
import {SeanceRoomApiModel} from '../components/seance/models/api/seance-room-api.model';
import {MapperService} from '../../../../../shared/helpers/external/mapper/mapper.service';
import {AddMovieApiService} from './add-movie-api.service';

@Injectable({
  providedIn: AdminServicesModule
})
export class AddMovieService {
  private MovieGender = MovieGender;

  constructor(
    private _translator: TranslatorService,
    private _formValidatorService: FormValidatorService,
    private _mapper: MapperService,
    private _addMovieApiService: AddMovieApiService,
    private fb: FormBuilder) {
  }

  public getForm(): FormGroup {
    const form = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'gender': new FormControl(null),
      'duration': new FormControl(null, [Validators.required, Validators.min(1)]),
      'rate': new FormControl(3, [Validators.required, Validators.min(1), Validators.max(5)]),
      'posterUrl': new FormControl(null, [Validators.required, this._formValidatorService.isUrl.bind(this)]),
      'trailerUrl': new FormControl(null, [Validators.required, this._formValidatorService.isUrl.bind(this)])
    });
    this._setMovieProjectionFormGroup(form);

    return form;
  }

  public getMultiselectDropdownComponentSettings(): IMultipleSelectDropdownSettings {
    return {
      idField: 'value',
      textField: 'translatedText',
      itemsShowLimit: 3,
      allowSearchFilter: false,
      enableCheckAll: false
    };
  }

  public getGenders(): MovieGenderTranslateModel[] {
    const result: MovieGenderTranslateModel[] = [];

    for (const movieGenderName in this.MovieGender) {
      const movieGender = movieGenderName as MovieGender;
      if (movieGender) {
        const translatedText = this._translator.translateMovieGender(movieGender);
        if (translatedText) {
          result.push({value: movieGender, translatedText: translatedText});
        }
      }
    }

    return result;
  }

  public addMovie(selectedGenders: MovieGenderTranslateModel[], form: FormGroup): void {
    this._addMovieApiService.addMovie(this._createAddMovieRequest(selectedGenders, form));
  }

  private _createAddMovieRequest(selectedGenders: MovieGenderTranslateModel[], form: FormGroup): AddMovieRequestModel {
    const genders: MovieGender[] = [];
    selectedGenders.forEach(gender => genders.push(gender.value));
    const seances = form.get('movieProjection').get('addedSeances').value as AddMovieWeekModel[];
    const castedSeances: AddSeanceWeekRequestModel[] = [];
    seances.forEach(q => castedSeances.push(this._mapper.toAddSeanceWeekRequestModel(q)));

    const result: AddMovieRequestModel = {
      title: form.get('title').value,
      rate: form.get('rate').value,
      duration: form.get('duration').value,
      posterUrl: form.get('posterUrl').value,
      trailerUrl: form.get('trailerUrl').value,
      seanceRoomId: (form.get('movieProjection').get('seanceRoom').value as SeanceRoomApiModel).id,
      genders: genders,
      seances: castedSeances
    };

    return result;
  }

  private _setMovieProjectionFormGroup(form: FormGroup): void {
    form.addControl('movieProjection', new FormGroup({
      'weeksCount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'movieProjectionTime': new FormControl(null, [Validators.required]),
      'seanceRoom': new FormControl(null, [Validators.required]),
      'addedSeances': new FormControl(null)
    }));
  }
}

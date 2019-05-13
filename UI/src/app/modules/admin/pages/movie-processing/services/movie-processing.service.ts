import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../shared/services/form-validator.service';
import {AdminServicesModule} from '../../../admin-services.module';
import {TranslatorService} from '../../../../../shared/helpers/internal/translator.service';
import {MovieGenderTranslateModel} from '../models/movie-gender-translate.model';
import {IMultipleSelectDropdownSettings} from '../../../../../shared/components/external/multiple-select-dropdown/interfaces/i-multiple-select-dropdown-settings';
import {MovieProcessingRequestModel} from '../models/requests/movie-processing-request.model';
import {MovieProcessingApiService} from './movie-processing-api.service';
import {MovieProcessingScreeningRoomModel} from '../models/movie-processing-screening-room.model';
import {MovieProcessingScreeningRoomRequestModel} from '../models/requests/movie-processing-screening-room-request.model';
import {AdminMapperService} from 'src/app/shared/helpers/external/mapper/modules/admin/admin-mapper.service';
import {MovieProcessingApiModel} from '../models/api/movie-processing-api.model';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProcessingService {
  constructor(
    private _translator: TranslatorService,
    private _formValidatorService: FormValidatorService,
    private _mapper: AdminMapperService,
    private _apiService: MovieProcessingApiService) {
  }

  public getMovie(movieId: string): MovieProcessingApiModel {
    let movie: MovieProcessingApiModel = null;

    if (movieId && movieId.length > 0) {
      movie = this._apiService.getMovie(movieId);
    }

    return movie;
  }

  public getForm(movie: MovieProcessingApiModel): FormGroup {
    return movie ? this._getFilledForm(movie) : this._getCleanForm();
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
    const movieGenders = this._apiService.getGenders();

    movieGenders.forEach(movieGender => {
      const translatedText = this._translator.translateMovieGender(movieGender);
      if (translatedText) {
        result.push({value: movieGender, translatedText: translatedText});
      }
    });

    return result;
  }

  public getSelectedGendersIfEditMovie(movie: MovieProcessingApiModel): MovieGenderTranslateModel[] {
    const result: MovieGenderTranslateModel[] = [];

    if (movie) {
      movie.genders.forEach(gender => {
        const translatedText = this._translator.translateMovieGender(gender);
        if (translatedText) {
          result.push({value: gender, translatedText: translatedText});
        }
      });
    }

    return result;
  }

  public addMovie(selectedGenders: MovieGenderTranslateModel[], form: FormGroup): void {
    this._apiService.addMovie(this._createMovieProcessingRequest(selectedGenders, form));
  }

  public editMovie(selectedGenders: MovieGenderTranslateModel[], form: FormGroup): void {
    this._apiService.editMovie(this._createMovieProcessingRequest(selectedGenders, form));
  }

  public isFormValid(bookingForm: FormGroup, selectedGenders: MovieGenderTranslateModel[]): boolean {
    return selectedGenders.length > 0
      && bookingForm.get('title').valid
      && bookingForm.get('duration').valid
      && bookingForm.get('rating').valid
      && bookingForm.get('posterUrl').valid
      && bookingForm.get('trailerUrl').valid;
  }

  private _createMovieProcessingRequest(selectedGenders: MovieGenderTranslateModel[], form: FormGroup): MovieProcessingRequestModel {
    const genders: string[] = [];
    selectedGenders.forEach(gender => genders.push(gender.value));
    const screeningRooms = form.get('movieProjection').get('addedSeances').value as MovieProcessingScreeningRoomModel[];
    let castedScreeningRooms: MovieProcessingScreeningRoomRequestModel[] = [];
    screeningRooms.forEach(q => castedScreeningRooms.push(this._mapper.toAddMovieSreeningRoomRequestModel(q)));
    castedScreeningRooms = castedScreeningRooms.filter(sr => sr.seances);
    const result: MovieProcessingRequestModel = {
      id: form.get('id').value,
      title: form.get('title').value,
      rating: form.get('rating').value,
      duration: form.get('duration').value,
      posterUrl: form.get('posterUrl').value,
      trailerUrl: form.get('trailerUrl').value,
      genders: genders,
      screeningRooms: castedScreeningRooms
    };

    return result;
  }

  private _getCleanForm(): FormGroup {
    const form = new FormGroup({
      'id': new FormControl(null),
      'title': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'duration': new FormControl(null, [Validators.required, Validators.min(1)]),
      'gender': new FormControl(null),
      'rating': new FormControl(3, [Validators.required, Validators.min(1), Validators.max(5)]),
      'posterUrl': new FormControl(null, [Validators.required, this._formValidatorService.isUrl.bind(this)]),
      'trailerUrl': new FormControl(null, [Validators.required, this._formValidatorService.isUrl.bind(this)])
    });

    form.addControl('movieProjection', new FormGroup({
      'weeksCount': new FormControl(null, [Validators.required, Validators.min(1)]),
      'movieProjectionTime': new FormControl(null, [Validators.required]),
      'screeningRoom': new FormControl(null, [Validators.required]),
      'addedSeances': new FormControl(null)
    }));

    return form;
  }

  private _getFilledForm(movie: MovieProcessingApiModel): FormGroup {
    const castedMovie = this._mapper.toMovieProcessingModel(movie);

    const form = new FormGroup({
      'id': new FormControl(castedMovie.id),
      'title': new FormControl(castedMovie.title, [Validators.required, Validators.maxLength(100)]),
      'duration': new FormControl(castedMovie.duration, [Validators.required, Validators.min(1)]),
      'gender': new FormControl(null),
      'rating': new FormControl(castedMovie.rating, [Validators.required, Validators.min(1), Validators.max(5)]),
      'posterUrl': new FormControl(castedMovie.posterUrl, [Validators.required, this._formValidatorService.isUrl.bind(this)]),
      'trailerUrl': new FormControl(castedMovie.trailerUrl, [Validators.required, this._formValidatorService.isUrl.bind(this)])
    });

    if (castedMovie.screeningRooms.length > 0) {
      form.addControl('movieProjection', new FormGroup({
        'weeksCount': new FormControl(castedMovie.screeningRooms[0].weeks.length, [Validators.required, Validators.min(1)]),
        'movieProjectionTime': new FormControl(null, [Validators.required]),
        'screeningRoom': new FormControl(castedMovie.screeningRooms[0].id, [Validators.required]),
        'addedSeances': new FormControl(castedMovie.screeningRooms)
      }));
    }
    return form;
  }
}

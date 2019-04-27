import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AddMovieWeekApiModel} from '../models/api/add-movie-week-api.model';
import {SeanceRoomApiModel} from '../models/api/seance-room-api.model';
import {SeanceValidator} from '../validators/seance-validator';
import {SeanceComponentDataModel} from '../models/seance-component-data.model';
import {SeanceApiService} from './seance-api.service';
import {SelectedDaySeancesModel} from '../models/selected-day-seances.model';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {SeanceRequestModel} from '../models/requests/seance-request.model';
import {FormValidatorService} from '../../../../../../../shared/services/form-validator.service';
import {LuxonService} from '../../../../../../../shared/helpers/external/luxon.service';
import {AddMovieApiModel} from '../models/api/add-movie-api.model';
import {AdminServicesModule} from '../../../../../admin-services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class SeanceService {
  constructor(
    private _formValidatorService: FormValidatorService,
    private _movieProjectionService: SeanceApiService,
    private _luxonService: LuxonService) {
  }

  public initComponent(bookingForm: FormGroup): SeanceComponentDataModel {
    const result = new SeanceComponentDataModel();
    result.bookingForm = bookingForm;
    result.bookingForm.get('weeksCount').setValue(1);
    result.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
    result.seanceRooms = this._movieProjectionService.getSeanceRooms();
    result.bookingForm.get('seanceRoom').setValue(result.seanceRooms[0]);
    result.selectedDaySeancesModel = this.getSelectedDayMoviesProjectionsModel(result.selectedWeekNumber, result.selectedDayNumber - 1);
    result.selectedDate = this.getDate(result.selectedWeekNumber, result.selectedDayNumber);
    this.setSeanceTimeValidator(result);

    return result;
  }

  public setSeanceTimeValidator(data: SeanceComponentDataModel): void {
    const selectedSeanceRoom: SeanceRoomApiModel = data.bookingForm.get('seanceRoom').value;
    const movieProjectionDuration: number = data.movieDuration ? data.movieDuration : null;
    data.bookingForm.setControl('movieProjectionTime', new FormControl(
      null,
      [Validators.required,
        SeanceValidator.isValid(
          data.selectedDate,
          data.selectedDaySeancesModel,
          movieProjectionDuration,
          selectedSeanceRoom.breakBeforeAndAfterSeance)]));
  }

  public isInvalid(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalidAndTouched(bookingForm, formControlName);
  }

  public getSelectedDayMoviesProjectionsModel(weekNumber: number, dayNumber: number): SelectedDaySeancesModel {
    const result = new SelectedDaySeancesModel();
    result.weekNumber = weekNumber;
    result.dayNumber = dayNumber;
    result.seances = this._getMovieProjectionsForSelectedDay(weekNumber, dayNumber);

    return result;
  }

  public convertToPolishDayName(day: number) {
    switch (day) {
      case 0:
        return 'Poniedziałek';
      case 1:
        return 'Wtorek';
      case 2:
        return 'Środa';
      case 3:
        return 'Czwartek';
      case 4:
        return 'Piątek';
      case 5:
        return 'Sobota';
      case 6:
        return 'Niedziela';
    }
  }

  public setAddMovieApiModel(weeksCount: number, addMovieApiModel: AddMovieApiModel): void {
    this._removeWeek(weeksCount, addMovieApiModel);
    this._addWeek(weeksCount, addMovieApiModel);
  }

  public getDate(weeks: number, days: number): Date {
    const firstWeekDay = this._getFisrtWeekDay();
    const date: string = this._luxonService.DateTime.local(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day).plus({
      weeks: weeks,
      days: days - 1
    }).toISODate();

    return new Date(date);
  }

  private _getMovieProjectionsForSelectedDay(weekNumber: number, dayNumber: number): SeanceApiModel[] {
    const request: SeanceRequestModel = new SeanceRequestModel();
    request.seanceRoomId = 'sss';
    request.date = this.getDate(weekNumber, dayNumber);

    return this._movieProjectionService.getMoviesProjections(request);
  }

  private _removeWeek(weeksCount: number, addMovieApiModel: AddMovieApiModel): void {
    if (addMovieApiModel.weeks.length > weeksCount) {
      while (addMovieApiModel.weeks.length > weeksCount) {
        addMovieApiModel.weeks.pop();
      }
    }
  }

  private _addWeek(weeksCount: number, addMovieApiModel: AddMovieApiModel): void {
    if (addMovieApiModel.weeks.length < weeksCount) {
      while (addMovieApiModel.weeks.length < weeksCount) {
        addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
      }
    }
  }

  private _getFisrtWeekDay(): any {
    return this._luxonService.DateTime.local().minus(
      {
        days: this._getDaysToMinus()
      });
  }

  private _getDaysToMinus(): number {
    const curretDate = new Date();
    const currentDayOfWeekNumber = curretDate.getDay() === 0 ? 7 : curretDate.getDay();
    return currentDayOfWeekNumber - 1;
  }
}

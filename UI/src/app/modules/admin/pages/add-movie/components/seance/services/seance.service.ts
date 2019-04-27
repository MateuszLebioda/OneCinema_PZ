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
    const data = new SeanceComponentDataModel();

    data.bookingForm = bookingForm;
    data.bookingForm.get('weeksCount').setValue(1);
    data.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
    data.seanceRooms = this._movieProjectionService.getSeanceRooms();
    data.bookingForm.get('seanceRoom').setValue(data.seanceRooms[0]);

    const selectedSeanceRoom: SeanceRoomApiModel = data.bookingForm.get('seanceRoom').value;
    const movieProjectionDuration: number = data.bookingForm.get('weeksCount').value;

    data.selectedDayMoviesProjectionsModel = this.getSelectedDayMoviesProjectionsModel(data.selectedWeek, data.selectedDay - 1);

    data.bookingForm.setControl('movieProjectionTime', new FormControl(
      null,
      [Validators.required,
        SeanceValidator.isValid(
          new Date('April 3, 2019 10:05:00'),
          data.selectedDayMoviesProjectionsModel,
          movieProjectionDuration,
          selectedSeanceRoom.breakBeforeAndAfterSeance)]));

    return data;
  }

  public isInvalid(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalidAndTouched(bookingForm, formControlName);
  }

  public getSelectedDayMoviesProjectionsModel(weekNumber: number, dayNumber: number): SelectedDaySeancesModel {
    const result = new SelectedDaySeancesModel();
    result.weekNumber = weekNumber;
    result.dayNumber = dayNumber;
    result.seances = this.getMovieProjectionsForSelectedDay(weekNumber, dayNumber);

    return result;
  }

  public getMovieProjectionsForSelectedDay(weekNumber: number, dayNumber: number): SeanceApiModel[] {
    const request: SeanceRequestModel = new SeanceRequestModel();
    request.seanceRoomId = 'sss';
    request.date = this.getDate(weekNumber, dayNumber);

    return this._movieProjectionService.getMoviesProjections(request);
  }

  public getDate(weeks: number, days: number): Date {
    const firstWeekDay = this.getFisrtWeekDay();
    const date: string = this._luxonService.DateTime.local(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day).plus({
      weeks: weeks,
      days: days
    }).toISODate();

    return new Date(date);
  }

  public getFisrtWeekDay(): any {
    return this._luxonService.DateTime.local().minus(
      {
        days: this.getDaysToMinus()
      });
  }

  public getDaysToMinus(): number {
    const curretDate = new Date();
    const currentDayOfWeekNumber = curretDate.getDay() === 0 ? 7 : curretDate.getDay();
    return currentDayOfWeekNumber - 1;
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
}

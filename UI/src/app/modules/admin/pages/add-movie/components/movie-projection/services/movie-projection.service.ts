import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {ControlContainer, FormControl, FormGroup, Validators} from '@angular/forms';
import {AddMovieWeekApiModel} from '../models/api/add-movie-week-api.model';
import {SeanceRoomApiModel} from '../models/api/seance-room-api.model';
import {SeanceValidator} from '../validators/seance-validator';
import {MovieProjectionPublicProperties} from '../models/movie-projection-public-properties';
import {MovieProjectionApiService} from './movie-projection-api.service';
import {SelectedDayMoviesProjectionsModel} from '../models/selected-day-movies-projections.model';
import {MovieProjectionApiModel} from '../models/api/movie-projection-api.model';
import {MovieProjectionRequestModel} from '../models/requests/movie-projection-request.model';
import {FormValidatorService} from '../../../../../../../shared/services/form-validator.service';
import {LuxonService} from '../../../../../../../shared/helpers/external/luxon.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProjectionService {
  constructor(
    private _controlContainer: ControlContainer,
    private _formValidatorService: FormValidatorService,
    private _movieProjectionService: MovieProjectionApiService,
    private _luxonService: LuxonService,
    private _router: Router) {
  }

  public initComponent(bookingForm: FormGroup): MovieProjectionPublicProperties {
    const data = new MovieProjectionPublicProperties();

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

  public getSelectedDayMoviesProjectionsModel(weekNumber: number, dayNumber: number): SelectedDayMoviesProjectionsModel {
    const result = new SelectedDayMoviesProjectionsModel();
    result.weekNumber = weekNumber;
    result.dayNumber = dayNumber;
    result.moviesProjections = this.getMovieProjectionsForSelectedDay(weekNumber, dayNumber);

    return result;
  }

  public getMovieProjectionsForSelectedDay(weekNumber: number, dayNumber: number): MovieProjectionApiModel[] {
    const request: MovieProjectionRequestModel = new MovieProjectionRequestModel();
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
}

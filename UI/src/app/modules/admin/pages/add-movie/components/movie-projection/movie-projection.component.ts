import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {MovieProjectionApiService} from './services/movie-projection-api.service';
import {AddMovieApiModel} from './models/api/add-movie-api.model';
import {AddMovieWeekApiModel} from './models/api/add-movie-week-api.model';
import {MovieProjectionApiModel} from './models/api/movie-projection-api.model';
import {SelectedDayMoviesProjectionsModel} from './models/selected-day-movies-projections.model';
import {LuxonService} from '../../../../../../shared/helpers/external/luxon.service';
import {MovieProjectionRequestModel} from './models/requests/movie-projection-request.model';
import {SeanceRoomApiModel} from './models/api/seance-room-api.model';
import {SeanceValidator} from './validators/seance-validator';

@Component({
  selector: 'app-movie-projection',
  templateUrl: './movie-projection.component.html',
  styleUrls: ['./movie-projection.component.css', '../../add-movie.component.css']
})
export class MovieProjectionComponent implements OnInit {
  public get formControls() {
    return this.bookingForm.controls;
  }

  public get weekCount(): number {
    if (!this.bookingForm.get('weeksCount').value && !isNaN(this.bookingForm.get('weeksCount').value)) {
      return 0;
    }
    this._setAddMovieApiModel(this.bookingForm.get('weeksCount').value);

    return this.bookingForm.get('weeksCount').value;
  }


  public get moviesProjections(): MovieProjectionApiModel[] {
    if (this.selectedDayMoviesProjectionsModel.weekNumber === this.selectedWeek &&
      this.selectedDayMoviesProjectionsModel.dayNumber === this.selectedDay) {
      return this.selectedDayMoviesProjectionsModel.moviesProjections;
    }
    this.setSelectedDayMoviesProjectionsModel(this.selectedWeek, this.selectedDay - 1);

    return this.selectedDayMoviesProjectionsModel.moviesProjections;
  }

  public bookingForm: FormGroup;
  public addMovieApiModel: AddMovieApiModel = new AddMovieApiModel();
  public selectedDayMoviesProjectionsModel: SelectedDayMoviesProjectionsModel = new SelectedDayMoviesProjectionsModel();
  public selectedWeek = 1;
  public selectedDay = 1;
  public seanceRooms: SeanceRoomApiModel[] = [];

  constructor(
    private _controlContainer: ControlContainer,
    private _formValidatorService: FormValidatorService,
    private _movieProjectionService: MovieProjectionApiService,
    private _luxonService: LuxonService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = <FormGroup>this._controlContainer.control;
    this.bookingForm.get('weeksCount').setValue(1);
    this.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
    this.seanceRooms = this._movieProjectionService.getSeanceRooms();
    this.bookingForm.get('seanceRoom').setValue(this.seanceRooms[0]);

    const selectedSeanceRoom: SeanceRoomApiModel = this.bookingForm.get('seanceRoom').value;
    const movieProjectionDuration: number = this.bookingForm.get('weeksCount').value;

    this.setSelectedDayMoviesProjectionsModel(this.selectedWeek, this.selectedDay - 1);

    this.bookingForm.setControl('movieProjectionTime', new FormControl(
      null,
      [Validators.required,
        SeanceValidator.isValid(
          new Date('April 3, 2019 10:05:00'),
          this.selectedDayMoviesProjectionsModel,
          movieProjectionDuration,
          selectedSeanceRoom.breakBeforeAndAfterSeance)]));
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
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

  public _getMovieProjectionsForSelectedDay(weekNumber: number, dayNumber: number): MovieProjectionApiModel[] {
    const request: MovieProjectionRequestModel = new MovieProjectionRequestModel();
    request.seanceRoomId = 'sss';
    request.date = this._getDate(weekNumber, dayNumber);

    return this._movieProjectionService.getMoviesProjections(request);
  }

  public selectWeek(weekNumber: number) {
    this.selectedWeek = weekNumber;
  }

  public selectDay(dayNumber: number) {
    this.selectedDay = dayNumber;
  }

  private _setAddMovieApiModel(weeksCount: number): void {
    this._removeWeek(weeksCount);
    this._addWeek(weeksCount);
  }

  private _removeWeek(weeksCount: number): void {
    if (this.addMovieApiModel.weeks.length > weeksCount) {
      while (this.addMovieApiModel.weeks.length > weeksCount) {
        this.addMovieApiModel.weeks.pop();
      }
    }
  }

  private _addWeek(weeksCount: number): void {
    if (this.addMovieApiModel.weeks.length < weeksCount) {
      while (this.addMovieApiModel.weeks.length < weeksCount) {
        this.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
      }
    }
  }

  private _getDate(weeks: number, days: number): Date {
    const firstWeekDay = this._getFisrtWeekDay();
    const date: string = this._luxonService.DateTime.local(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day).plus({
      weeks: weeks,
      days: days
    }).toISODate();

    return new Date(date);
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

  private setSelectedDayMoviesProjectionsModel(weekNumber: number, dayNumber: number): void {
    this.selectedDayMoviesProjectionsModel.weekNumber = weekNumber;
    this.selectedDayMoviesProjectionsModel.dayNumber = dayNumber;
    this.selectedDayMoviesProjectionsModel
      .moviesProjections = this._getMovieProjectionsForSelectedDay(this.selectedWeek, this.selectedDay);
  }
}


import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {MovieProjectionService} from './services/movie-projection.service';
import {AddMovieApiModel} from './models/api-models/add-movie-api.model';
import {AddMovieWeekApiModel} from './models/api-models/add-movie-week-api.model';
import {MovieProjectionApiModel} from './models/api-models/movie-projection-api.model';
import {SelectedDayMoviesProjectionsModel} from './models/selected-day-movies-projections.model';
import {LuxonService} from '../../../../../../shared/helpers/external/luxon.service';

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
    console.log(this.addMovieApiModel);
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

  constructor(
    private _controlContainer: ControlContainer,
    private _formValidatorService: FormValidatorService,
    private _movieProjectionService: MovieProjectionService,
    private _luxonService: LuxonService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = <FormGroup>this._controlContainer.control;
    this.bookingForm.get('weeksCount').setValue(1);
    this.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());
    this.setSelectedDayMoviesProjectionsModel(this.selectedWeek, this.selectedDay - 1);
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
    return this._movieProjectionService.getMoviesProjections(this._getDate(weekNumber, dayNumber));
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
    const date: string = this._luxonService.dateTime.local(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day).plus({
      weeks: weeks,
      days: days
    }).toISODate();

    return new Date(date);
  }

  private _getFisrtWeekDay(): any {
    return this._luxonService.dateTime.local().minus(
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
    this.selectedDayMoviesProjectionsModel.weekNumber = this.selectedWeek;
    this.selectedDayMoviesProjectionsModel.dayNumber = this.selectedDay;
    this.selectedDayMoviesProjectionsModel
      .moviesProjections = this._getMovieProjectionsForSelectedDay(this.selectedWeek, this.selectedDay);
  }
}


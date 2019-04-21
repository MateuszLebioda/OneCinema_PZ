import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {MovieProjectionService} from './services/movie-projection.service';
import {AddMovieApiModel} from './models/api-models/add-movie-api.model';
import {AddMovieWeekApiModel} from './models/api-models/add-movie-week-api.model';
import {MovieProjectionApiModel} from './models/api-models/movie-projection-api.model';
import {SelectedDayMoviesProjectionsModel} from './models/selected-day-movies-projections.model';
import {getNumberOfCurrencyDigits} from '@angular/common';

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


  public get movieProjections(): MovieProjectionApiModel[] {
    if (this.selectedDayMoviesProjectionsModel.weekNumber === this.selectedWeek &&
      this.selectedDayMoviesProjectionsModel.dayNumber === this.selectedDay) {
      return this.selectedDayMoviesProjectionsModel.moviesProjections;
    }

    this.selectedDayMoviesProjectionsModel.weekNumber = this.selectedWeek;
    this.selectedDayMoviesProjectionsModel.dayNumber = this.selectedDay;
    this.selectedDayMoviesProjectionsModel
      .moviesProjections = this._getMovieProjectionsForSelectedDay(this.selectedWeek, this.selectedDay);

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
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = <FormGroup>this._controlContainer.control;
    this.bookingForm.get('weeksCount').setValue(1);

    this.addMovieApiModel.weeks.push(new AddMovieWeekApiModel());

    this.selectedDayMoviesProjectionsModel.weekNumber = this.selectedWeek;
    this.selectedDayMoviesProjectionsModel.dayNumber = this.selectedDay;
    console.log(this.getNumberOfWeek());
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
    return this._movieProjectionService.getMoviesMrojections(this._getDate(weekNumber, dayNumber));
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

  private _getDate(weekNumber: number, dayNumber: number): Date {
    const day = new Date();
    console.log(this.getNumberOfWeek());
    return new Date();
  }

  private getNumberOfWeek(): number {
    const today = new Date();
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay()) / 7);
  }
}


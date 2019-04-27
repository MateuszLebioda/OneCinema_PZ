import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {MovieProjectionApiModel} from './models/api/movie-projection-api.model';
import {MovieProjectionService} from './services/movie-projection.service';
import {MovieProjectionPublicProperties} from './models/movie-projection-public-properties';

@Component({
  selector: 'app-movie-projection',
  templateUrl: './movie-projection.component.html',
  styleUrls: ['./movie-projection.component.css', '../../add-movie.component.css']
})
export class MovieProjectionComponent implements OnInit {
  public get formControls() {
    return this.data.bookingForm.controls;
  }

  public get weekCount(): number {
    if (!this.data.bookingForm.get('weeksCount').value && !isNaN(this.data.bookingForm.get('weeksCount').value)) {
      return 0;
    }
    this._movieProjectionService.setAddMovieApiModel(this.data.bookingForm.get('weeksCount').value, this.data.addMovieApiModel);

    return this.data.bookingForm.get('weeksCount').value;
  }


  public get moviesProjections(): MovieProjectionApiModel[] {
    if (this.data.selectedDayMoviesProjectionsModel.weekNumber === this.data.selectedWeek &&
      this.data.selectedDayMoviesProjectionsModel.dayNumber === this.data.selectedDay) {
      return this.data.selectedDayMoviesProjectionsModel.moviesProjections;
    }
    this.data.selectedDayMoviesProjectionsModel = this._movieProjectionService.getSelectedDayMoviesProjectionsModel(
      this.data.selectedWeek, this.data.selectedDay - 1);

    return this.data.selectedDayMoviesProjectionsModel.moviesProjections;
  }

  public data: MovieProjectionPublicProperties = new MovieProjectionPublicProperties();

  constructor(
    private _controlContainer: ControlContainer,
    private _movieProjectionService: MovieProjectionService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.data = this._movieProjectionService.initComponent(<FormGroup>this._controlContainer.control);
  }

  public isInvalid(formControlName: string): boolean {
    return this._movieProjectionService.isInvalid(formControlName, this.data.bookingForm);
  }

  public convertToPolishDayName(day: number) {
    return this._movieProjectionService.convertToPolishDayName(day);
  }

  public selectWeek(weekNumber: number) {
    this.data.selectedWeek = weekNumber;
  }

  public selectDay(dayNumber: number) {
    this.data.selectedDay = dayNumber;
  }
}


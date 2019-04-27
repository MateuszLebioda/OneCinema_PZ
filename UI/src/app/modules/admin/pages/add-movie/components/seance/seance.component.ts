import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceService} from './services/seance.service';
import {SeanceComponentDataModel} from './models/seance-component-data.model';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css', '../../add-movie.component.css']
})
export class SeanceComponent implements OnInit, OnDestroy {
  @Input() movieDuration: Subject<number>;

  public get formControls() {
    return this.data.bookingForm.controls;
  }

  public get weekCount(): number {
    if (!this.data.bookingForm.get('weeksCount').value && !isNaN(this.data.bookingForm.get('weeksCount').value)) {
      return 0;
    }
    this._seanceService.setAddMovieApiModel(this.data.bookingForm.get('weeksCount').value, this.data.addMovieApiModel);

    return this.data.bookingForm.get('weeksCount').value;
  }

  public get seances(): SeanceApiModel[] {
    if (this.data.selectedDaySeancesModel.weekNumber === this.data.selectedWeekNumber &&
      this.data.selectedDaySeancesModel.dayNumber === this.data.selectedDayNumber) {
      return this.data.selectedDaySeancesModel.seances;
    }
    this.data.selectedDaySeancesModel = this._seanceService.getSelectedDayMoviesProjectionsModel(
      this.data.selectedWeekNumber, this.data.selectedDayNumber - 1);

    return this.data.selectedDaySeancesModel.seances;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();

  private _movieDuration = 0;

  constructor(
    private _controlContainer: ControlContainer,
    private _seanceService: SeanceService,
    private _router: Router) {
  }

  ngOnInit() {
    this.data = this._seanceService.initComponent(<FormGroup>this._controlContainer.control);
    this.movieDuration.subscribe(movieDuration => {
      this.data.movieDuration = movieDuration;
      this._seanceService.setSeanceTimeValidator(this.data);
    });
  }

  ngOnDestroy() {
    this.movieDuration.unsubscribe();
  }


  public isInvalid(formControlName: string): boolean {
    return this._seanceService.isInvalid(formControlName, this.data.bookingForm);
  }

  public getPolishDayName(day: number) {
    return this._seanceService.convertToPolishDayName(day);
  }

  public selectWeek(weekNumber: number) {
    if (weekNumber !== this.data.selectedWeekNumber) {
      this.data.selectedWeekNumber = weekNumber;
      this.data.selectedDate = this._seanceService.getDate(this.data.selectedWeekNumber, this.data.selectedDayNumber);
      this._seanceService.setSeanceTimeValidator(this.data);
    }
  }

  public selectDay(dayNumber: number) {
    if (dayNumber !== this.data.selectedDayNumber) {
      this.data.selectedDayNumber = dayNumber;
      this.data.selectedDate = this._seanceService.getDate(this.data.selectedWeekNumber, this.data.selectedDayNumber);
      this._seanceService.setSeanceTimeValidator(this.data);
    }
  }
}


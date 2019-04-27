import {Component, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceService} from './services/seance.service';
import {SeanceComponentDataModel} from './models/seance-component-data.model';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css', '../../add-movie.component.css']
})
export class SeanceComponent implements OnInit {
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


  public get seances(): SeanceApiModel[] {
    if (this.data.selectedDayMoviesProjectionsModel.weekNumber === this.data.selectedWeek &&
      this.data.selectedDayMoviesProjectionsModel.dayNumber === this.data.selectedDay) {
      return this.data.selectedDayMoviesProjectionsModel.seances;
    }
    this.data.selectedDayMoviesProjectionsModel = this._movieProjectionService.getSelectedDayMoviesProjectionsModel(
      this.data.selectedWeek, this.data.selectedDay - 1);

    return this.data.selectedDayMoviesProjectionsModel.seances;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();

  constructor(
    private _controlContainer: ControlContainer,
    private _movieProjectionService: SeanceService,
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


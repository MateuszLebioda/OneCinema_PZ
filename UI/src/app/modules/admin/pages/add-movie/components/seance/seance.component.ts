import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceService} from './services/seance.service';
import {SeanceComponentDataModel} from './models/seance-component-data.model';
import {Subject} from 'rxjs/internal/Subject';
import {SeanceRoomApiModel} from './models/api/seance-room-api.model';
import {AddSeanceToFormModel} from './models/add-seance-to-form.model';
import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';
import {AddMovieApiModel} from './models/api/add-movie-api.model';
import {RemoveSeanceFromFormModel} from './models/remove-seance-from-form.model';
import {AddMovieProjectionTimeApiModel} from './models/api/add-movie-projection-time-api.model';

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
    this._seanceService.setAddMovieApiModel(this.data);

    return this.data.bookingForm.get('weeksCount').value;
  }

  public get seances(): SeanceApiModel[] {
    if (this.data.selectedDaySeancesModel.weekNumber === this.data.selectedWeekNumber &&
      this.data.selectedDaySeancesModel.dayNumber === this.data.selectedDayNumber) {
      return this.data.selectedDaySeancesModel.seances;
    }
    this.data.selectedDaySeancesModel = this._seanceService.getSelectedDaySeances(
      this.data.selectedWeekNumber, this.data.selectedDayNumber - 1);

    return this.data.selectedDaySeancesModel.seances;
  }

  public get addedSeances(): AddMovieApiModel {
    if (this.data.bookingForm.get('addedSeances') && this.data.bookingForm.get('addedSeances').value) {
      return this.data.bookingForm.get('addedSeances').value as AddMovieApiModel;
    }

    return this.emptyAddMovieApiModel;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();
  public ProjectionType = ProjectionType;

  private readonly emptyAddMovieApiModel: AddMovieApiModel = new AddMovieApiModel();

  constructor(
    private _controlContainer: ControlContainer,
    private _seanceService: SeanceService,
    private _router: Router) {
  }

  ngOnInit() {
    this.data = this._seanceService.initComponent(<FormGroup>this._controlContainer.control);
    console.log(this.data);
    this.movieDuration.subscribe(movieDuration => {
      this.data.movieDuration = movieDuration;
      this._seanceService.setSeanceTimeValidator(this.data);
    });
  }

  ngOnDestroy() {
    this.movieDuration.unsubscribe();
  }


  public isInvalid(formControlName: string): boolean {
    return this._seanceService.isInvalidAndTouched(formControlName, this.data.bookingForm);
  }

  public getPolishDayName(day: number) {
    return this._seanceService.convertToPolishDayName(day);
  }

  public selectWeek(weekNumber: number) {
    if (weekNumber !== this.data.selectedWeekNumber) {
      this.data.selectedWeekNumber = weekNumber;
      this._seanceService.setSeanceTimeValidator(this.data);
    }
  }

  public selectDay(dayNumber: number) {
    if (dayNumber !== this.data.selectedDayNumber) {
      this.data.selectedDayNumber = dayNumber;
      this._seanceService.setSeanceTimeValidator(this.data);
    }
  }

  public addSeance(): void {
    if (!this.canAddMovie()) {
      return;
    }

    const data: AddSeanceToFormModel = {
      form: this.data.bookingForm,
      week: this.data.selectedWeekNumber,
      day: this.data.selectedDayNumber,
      duration: this.data.movieDuration,
      projectionType: this.data.selectedProjectionType
    };

    this._seanceService.addSeanceToForm(data);
  }

  public removeSeance(seanceToRemove: AddMovieProjectionTimeApiModel): void {
    const data: RemoveSeanceFromFormModel = {
      form: this.data.bookingForm,
      week: this.data.selectedWeekNumber,
      day: this.data.selectedDayNumber,
      seanceToRemove: seanceToRemove
    };

    this._seanceService.removeSeanceFromForm(data);
  }

  public canAddMovie(): boolean {
    return !this._seanceService.isInvalid('movieProjectionTime', this.data.bookingForm);
  }

  public setProjectionType(projectionType: ProjectionType): void {
    if (projectionType && projectionType !== this.data.selectedProjectionType) {
      this.data.selectedProjectionType = projectionType;
    }
  }

  public getSeanceRoomBreakBeforeAndAfterMovie(): number {
    if (this.data.bookingForm.get('seanceRoom')) {
      return (this.data.bookingForm.get('seanceRoom').value as SeanceRoomApiModel).breakBeforeAndAfterMovie;
    }
  }
}


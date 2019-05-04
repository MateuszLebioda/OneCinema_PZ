import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceService} from './services/seance.service';
import {SeanceComponentDataModel} from './models/seance-component-data.model';
import {ScreeningRoomApiModel} from './models/api/screening-room-api.model';
import {AddSeanceToFormModel} from './models/add-seance-to-form.model';
import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';
import {RemoveSeanceFromFormModel} from './models/remove-seance-from-form.model';
import {MovieProcessingWeekModel} from '../../models/movie-processing-week.model';
import {MovieProcessingSeanceTimeModel} from '../../models/movie-processing-seance-time.model';
import {MovieProcessingScreeningRoomModel} from '../../models/movie-processing-screening-room.model';
import {Subscription} from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-seance',
  templateUrl: './seance.component.html',
  styleUrls: ['./seance.component.css', '../../movie-processing.component.css']
})
export class SeanceComponent implements OnInit, OnDestroy {
  @Input() movieDuration: FormControl = new FormControl();

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
    if (this.data.selectedDaySeancesModel.weekNumber === this.data.selectedWeekNumber
      && this.data.selectedDaySeancesModel.dayNumber === this.data.selectedDayNumber
      && this.weekCount === this.data.weekCount) {
      return this.data.selectedDaySeancesModel.seancesWithAddedByUser;
    }
    this.data.selectedDaySeancesModel = this._seanceService.getSelectedDaySeances(
      this.data.selectedDaySeancesModel.screeningRoomId, this.data.selectedWeekNumber, this.data.selectedDayNumber);
    this._seanceService.attachAddedSeancesToSelectedDaySeances(this.data);

    this.data.weekCount = this.weekCount;

    return this.data.selectedDaySeancesModel.seancesWithAddedByUser;
  }

  public get addedSeances(): MovieProcessingWeekModel[] {
    if (this.data.bookingForm.get('addedSeances') && this.data.bookingForm.get('addedSeances').value) {
      const seanceRoom: ScreeningRoomApiModel = this.data.bookingForm.get('seanceRoom').value;
      const index = (this.data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[]).findIndex(x => x.id === seanceRoom.id);
      return (this.data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[])[index].weeks;
    }

    return this.emptyAddMovieApiModel;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();
  public ProjectionType = ProjectionType;

  private readonly emptyAddMovieApiModel: MovieProcessingWeekModel[] = [];
  private _movieDurationListner: Subscription = new Subscription();

  constructor(
    private _controlContainer: ControlContainer,
    private _seanceService: SeanceService,
    private _router: Router) {
  }

  ngOnInit() {
    this.data = this._seanceService.initComponent(<FormGroup>this._controlContainer.control, this.movieDuration);
    this._movieDurationListner = this.movieDuration.valueChanges.subscribe(() => {
      if (this.movieDuration.valid) {
        this._seanceService.setSeanceTimeValidator(this.data);
      }
    });
  }

  ngOnDestroy() {
    this._movieDurationListner.unsubscribe();
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

    const seanceRoom: ScreeningRoomApiModel = this.data.bookingForm.get('seanceRoom').value;
    const data: AddSeanceToFormModel = {
      form: this.data.bookingForm,
      screeningRoomId: seanceRoom.id,
      week: this.data.selectedWeekNumber,
      day: this.data.selectedDayNumber,
      duration: this.data.movieDuration.value + seanceRoom.breakBeforeAndAfterMovie * 2,
      projectionType: this.data.selectedProjectionType
    };

    this._seanceService.addSeanceToForm(data);
    this._seanceService.attachAddedSeancesToSelectedDaySeances(this.data);
  }

  public removeSeance(seanceToRemove: MovieProcessingSeanceTimeModel): void {
    const seanceRoom: ScreeningRoomApiModel = this.data.bookingForm.get('seanceRoom').value;
    const data: RemoveSeanceFromFormModel = {
      form: this.data.bookingForm,
      screeningRoomId: seanceRoom.id,
      week: this.data.selectedWeekNumber,
      day: this.data.selectedDayNumber,
      seanceToRemove: seanceToRemove
    };

    this._seanceService.removeSeanceFromForm(data);
    this._seanceService.attachAddedSeancesToSelectedDaySeances(this.data);
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
      return (this.data.bookingForm.get('seanceRoom').value as ScreeningRoomApiModel).breakBeforeAndAfterMovie;
    }
  }

  public resetAddedSeances(): void {
    const seanceRoom = this.data.bookingForm.get('seanceRoom').value as ScreeningRoomApiModel;

    this.data.selectedDaySeancesModel = this._seanceService.getSelectedDaySeances(
      seanceRoom.id, this.data.selectedWeekNumber, this.data.selectedDayNumber - 1);
  }


  public getSelectedDayDate(): Date {
    return this._seanceService.getDate(this.data.selectedDaySeancesModel.weekNumber, this.data.selectedDaySeancesModel.dayNumber);
  }
}


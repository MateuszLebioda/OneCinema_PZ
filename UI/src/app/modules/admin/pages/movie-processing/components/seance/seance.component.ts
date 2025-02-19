import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlContainer, FormControl, FormGroup} from '@angular/forms';
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
import {SeanceApiService} from './services/seance-api.service';
import {SeancesRequestModel} from './models/requests/seances-request.model';
import {SelectedDaySeancesModel} from './models/selected-day-seances.model';

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

    if (this.data.weekCount === this.data.bookingForm.get('weeksCount').value) {
      return this.data.bookingForm.get('weeksCount').value;
    }

    this._service.setAddedSeances(this.data);

    return this.data.bookingForm.get('weeksCount').value;
  }

  public get seances(): SeanceApiModel[] {
    if (this.data.selectedDaySeances.weekNumber === this.data.selectedWeekNumber
      && this.data.selectedDaySeances.dayNumber === this.data.selectedDayNumber
      && this.weekCount === this.data.weekCount) {
      return this.data.selectedDaySeances.seancesWithAddedByUser;
    }

    const request = this._getSeancesRequestModel(this.data.selectedDaySeances.screeningRoomId, this.data.selectedWeekNumber, this.data.selectedDayNumber);
    this._apiService.getMoviesProjections(request).subscribe(seances => {

      this.data.selectedDaySeances = this._getSelectedDaySeancesModel(
        this.data.selectedDaySeances.screeningRoomId, this.data.selectedWeekNumber, this.data.selectedDayNumber, seances);
      this._service.attachAddedAndDetachRemovedSeancesToSelectedDaySeances(this.data);
      this.data.weekCount = this.weekCount;
      return this.data.selectedDaySeances.seancesWithAddedByUser;
    });
  }

  public get addedSeances(): MovieProcessingWeekModel[] {
    if (this.data.bookingForm.get('addedSeances') && this.data.bookingForm.get('addedSeances').value) {
      const screeningRoom: ScreeningRoomApiModel = this.data.bookingForm.get('screeningRoom').value;
      const indexOfSellectedScreeningRoom = (this.data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[])
        .findIndex(x => x.id === screeningRoom.id);
      const seances = (this.data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[])[indexOfSellectedScreeningRoom];
      return seances ? seances.weeks : this.emptyMovieProcessingWeekModel;
    }

    return this.emptyMovieProcessingWeekModel;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();
  public ProjectionType = ProjectionType;
  public initComponent = false;

  private readonly emptyMovieProcessingWeekModel: MovieProcessingWeekModel[] = [];
  private _movieDurationListner: Subscription = new Subscription();

  constructor(
    private _controlContainer: ControlContainer,
    private _apiService: SeanceApiService,
    private _service: SeanceService) {
  }

  ngOnInit() {
    this._apiService.getScreeningRooms().subscribe(s => {
      const request = this._getSeancesRequestModel(s[0].id, 0, 1);
      this._apiService.getMoviesProjections(request).subscribe(x => {
        const selectedDaySeances = this._getSelectedDaySeancesModel(s[0].id, 0, 1, x);
        this.data = this._service.initComponent(<FormGroup>this._controlContainer.control, this.movieDuration, s, selectedDaySeances);
        this._movieDurationListner = this.movieDuration.valueChanges.subscribe(() => {
          if (this.movieDuration.valid) {
            this._service.setSeanceTimeValidator(this.data);
          }
        });
        this.initComponent = true;
      });
    });
  }

  ngOnDestroy() {
    this._movieDurationListner.unsubscribe();
  }

  public isInvalid(formControlName: string): boolean {
    return this._service.isInvalidAndTouched(formControlName, this.data.bookingForm);
  }

  public getPolishDayName(day: number) {
    return this._service.convertToPolishDayName(day);
  }

  public selectWeek(weekNumber: number) {
    if (weekNumber !== this.data.selectedWeekNumber) {
      this.data.selectedWeekNumber = weekNumber;
      this._service.setSeanceTimeValidator(this.data);
    }
  }

  public selectDay(dayNumber: number) {
    if (dayNumber !== this.data.selectedDayNumber) {
      this.data.selectedDayNumber = dayNumber;
      this._service.setSeanceTimeValidator(this.data);
    }
  }

  public addSeance(): void {
    if (!this.canAddMovie()) {
      return;
    }

    const screeningRoom: ScreeningRoomApiModel = this.data.bookingForm.get('screeningRoom').value;
    const data: AddSeanceToFormModel = {
      form: this.data.bookingForm,
      screeningRoomId: screeningRoom.id,
      week: this.data.selectedWeekNumber,
      day: this.data.selectedDayNumber,
      duration: this.data.movieDuration.value + screeningRoom.breakBeforeAndAfterMovie * 2,
      projectionType: this.data.selectedProjectionType
    };

    this._service.addSeanceToForm(data);
    this._service.attachAddedAndDetachRemovedSeancesToSelectedDaySeances(this.data);
  }

  public removeSeance(seanceToRemove: MovieProcessingSeanceTimeModel, weekIndex: number, dayIndex): void {
    const screeningRoom: ScreeningRoomApiModel = this.data.bookingForm.get('screeningRoom').value;
    const data: RemoveSeanceFromFormModel = {
      form: this.data.bookingForm,
      screeningRoomId: screeningRoom.id,
      week: weekIndex,
      day: dayIndex,
      seanceToRemove: seanceToRemove,
      removedSeances: this.data.removedSeances
    };

    this._service.removeSeanceFromForm(data);
    this._service.attachAddedAndDetachRemovedSeancesToSelectedDaySeances(this.data);
  }

  public canAddMovie(): boolean {
    return !this._service.isInvalid('movieProjectionTime', this.data.bookingForm);
  }

  public setProjectionType(projectionType: ProjectionType): void {
    if (projectionType && projectionType !== this.data.selectedProjectionType) {
      this.data.selectedProjectionType = projectionType;
    }
  }

  public getSeanceRoomBreakBeforeAndAfterMovie(): number {
    if (this.data.bookingForm.get('screeningRoom')) {
      return (this.data.bookingForm.get('screeningRoom').value as ScreeningRoomApiModel).breakBeforeAndAfterMovie;
    }
  }

  public setScrreningRoomSeances(): void {
    const screeningRoom = this.data.bookingForm.get('screeningRoom').value as ScreeningRoomApiModel;
    this._service.setAddedSeances(this.data);


    const request = this._getSeancesRequestModel(screeningRoom.id, this.data.selectedWeekNumber, this.data.selectedDayNumber);
    this._apiService.getMoviesProjections(request).subscribe(x => {
      this.data.selectedDaySeances = this._getSelectedDaySeancesModel(screeningRoom.id, this.data.selectedWeekNumber, this.data.selectedDayNumber, x);
      this._service.attachAddedAndDetachRemovedSeancesToSelectedDaySeances(this.data);
    });

    // this.data.selectedDaySeances = this._service.getSelectedDaySeances(
    //   screeningRoom.id, this.data.selectedWeekNumber, this.data.selectedDayNumber - 1);
  }

  public getSelectedDayDate(): Date {
    return this._service.getDate(this.data.selectedDaySeances.weekNumber, this.data.selectedDaySeances.dayNumber);
  }

  private _getSelectedDaySeancesModel(seanceRoomId: string, weekNumber: number, dayNumber: number, seances: SeanceApiModel[]): SelectedDaySeancesModel {
    const result = new SelectedDaySeancesModel();
    result.screeningRoomId = seanceRoomId;
    result.weekNumber = weekNumber;
    result.dayNumber = dayNumber;

    seances.forEach(w => {
      w.start = new Date(w.start);
      w.finish = new Date(w.finish);
    });

    result.seances = seances;
    return result;
  }

  private _getSeancesRequestModel(seanceRoomId: string, weekNumber: number, dayNumber: number): SeancesRequestModel {
    const request: SeancesRequestModel = new SeancesRequestModel();
    request.screeningRoomId = seanceRoomId;
    request.date = this._service.getDate(weekNumber, dayNumber);
    return request;
  }
}


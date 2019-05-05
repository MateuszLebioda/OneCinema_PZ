import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ScreeningRoomApiModel} from '../models/api/screening-room-api.model';
import {SeanceValidator} from '../validators/seance-validator';
import {SeanceComponentDataModel} from '../models/seance-component-data.model';
import {SeanceApiService} from './seance-api.service';
import {SelectedDaySeancesModel} from '../models/selected-day-seances.model';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {SeancesRequestModel} from '../models/requests/seances-request.model';
import {FormValidatorService} from '../../../../../../../shared/services/form-validator.service';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {Luxon} from '../../../../../../../shared/helpers/external/luxon';
import {Time} from '@angular/common';
import {DateTime} from 'luxon';
import {AddSeanceToFormModel} from '../models/add-seance-to-form.model';
import {DateTimeService} from '../../../../../../../shared/helpers/internal/date-time.service';
import {RemoveSeanceFromFormModel} from '../models/remove-seance-from-form.model';
import {MapperService} from '../../../../../../../shared/helpers/external/mapper/mapper.service';
import {Lodash} from '../../../../../../../shared/helpers/external/lodash';
import {MovieProcessingWeekModel} from '../../../models/movie-processing-week.model';
import {MovieProcessingSeanceTimeModel} from '../../../models/movie-processing-seance-time.model';
import {MovieProcessingScreeningRoomModel} from '../../../models/movie-processing-screening-room.model';

@Injectable({
  providedIn: AdminServicesModule
})
export class SeanceService {
  constructor(
    private _formValidatorService: FormValidatorService,
    private _dateTimeService: DateTimeService,
    private _mapper: MapperService,
    private _seanceService: SeanceApiService) {
  }

  public initComponent(bookingForm: FormGroup, movieDuration: FormControl): SeanceComponentDataModel {
    const result = new SeanceComponentDataModel();

    const curretDate = new Date();
    result.currentDayNumber = curretDate.getDay() === 0 ? 7 : curretDate.getDay();
    result.selectedDayNumber = result.currentDayNumber;
    result.movieDuration = movieDuration;
    result.bookingForm = bookingForm;
    result.seanceRooms = this._seanceService.getSeanceRooms();

    if (!result.bookingForm.get('weeksCount').value) {
      result.bookingForm.get('weeksCount').setValue(1);
      result.bookingForm.get('seanceRoom').setValue(result.seanceRooms[0]);
      result.bookingForm.get('addedSeances').setValue(this._getAddMovieScreeningRooms(result.seanceRooms));
    } else {
      const screeningRoomId = result.bookingForm.get('seanceRoom').value;
      const screeningRoom: ScreeningRoomApiModel = result.seanceRooms.find(sr => sr.id === screeningRoomId);
      result.bookingForm.get('seanceRoom').setValue(screeningRoom);
    }

    result.selectedDaySeancesModel = this.getSelectedDaySeances(result.seanceRooms[0].id, result.selectedWeekNumber, result.selectedDayNumber);
    result.selectedDaySeancesModel.screeningRoomId = result.seanceRooms[0].id;
    this.setSeanceTimeValidator(result);

    return result;
  }

  public setSeanceTimeValidator(data: SeanceComponentDataModel): void {
    const selectedSeanceRoom: ScreeningRoomApiModel = data.bookingForm.get('seanceRoom').value;
    data.bookingForm.setControl('movieProjectionTime', new FormControl(
      null,
      [
        Validators.required,
        SeanceValidator.isValid(
          this.getDate(data.selectedWeekNumber, data.selectedDayNumber),
          data.selectedDaySeancesModel.seancesWithAddedByUser,
          data.movieDuration,
          selectedSeanceRoom.breakBeforeAndAfterMovie)
      ]));
  }

  public isInvalid(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalid(bookingForm, formControlName);
  }

  public isInvalidAndTouched(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalidAndTouched(bookingForm, formControlName);
  }

  public getSelectedDaySeances(seanceRoomId: string, weekNumber: number, dayNumber: number): SelectedDaySeancesModel {
    const result = new SelectedDaySeancesModel();
    result.screeningRoomId = seanceRoomId;
    result.weekNumber = weekNumber;
    result.dayNumber = dayNumber;
    result.seances = this._getMovieProjectionsForSelectedDay(seanceRoomId, weekNumber, dayNumber);

    return result;
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

  public setAddMovieApiModel(data: SeanceComponentDataModel): void {
    const weeksCount = data.bookingForm.get('weeksCount').value;
    this._removeWeek(data, weeksCount);
    this._addWeek(data, weeksCount);
  }

  public getDate(week: number, day: number): Date {
    const firstWeekDay = this._getFisrtWeekDay();
    const date: string = Luxon.utils.DateTime.local(firstWeekDay.year, firstWeekDay.month, firstWeekDay.day).plus({
      weeks: week,
      days: day - 1
    }).toISODate();

    return new Date(date);
  }

  public addSeanceToForm(data: AddSeanceToFormModel): void {
    if (data.form.get('addedSeances')) {
      const addedSeances = data.form.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
      const time = this._dateTimeService.convertToTime(data.form.get('movieProjectionTime').value);
      const seance = new MovieProcessingSeanceTimeModel();
      seance.projectionType = data.projectionType;
      seance.start = this._getDateWithTime(data.week, data.day, time);

      const seanceEnd: DateTime = Luxon.toDateTime(seance.start).plus({minutes: data.duration});
      seance.end = Luxon.toDate(seanceEnd);

      const index = addedSeances.findIndex(x => x.id === data.screeningRoomId);
      addedSeances[index].weeks[data.week].weekNumber = data.week;
      addedSeances[index].weeks[data.week].days[data.day - 1].seancesTimes.push(seance);

      data.form.get('addedSeances').setValue(addedSeances);
    }
  }

  public removeSeanceFromForm(data: RemoveSeanceFromFormModel): void {
    if (data.form.get('addedSeances')) {
      const addedSeances = data.form.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
      const index = addedSeances.findIndex(x => x.id === data.screeningRoomId);

      const indexOfseanceToRemove = addedSeances[index].weeks[data.week].days[data.day - 1].seancesTimes.findIndex(
        projectionTime => projectionTime.start === data.seanceToRemove.start
          && projectionTime.end === data.seanceToRemove.end);

      addedSeances[index].weeks[data.week].days[data.day - 1].seancesTimes.splice(indexOfseanceToRemove, 1);

      data.form.get('addedSeances').setValue(addedSeances);
    }
  }

  public attachAddedSeancesToSelectedDaySeances(data: SeanceComponentDataModel): void {
    if (data.bookingForm.get('addedSeances')) {
      const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
      const seanceRoom: ScreeningRoomApiModel = data.bookingForm.get('seanceRoom').value;
      const index = addedSeances.findIndex(x => x.id === seanceRoom.id);

      if (!addedSeances[index].weeks[data.selectedDaySeancesModel.weekNumber].days[data.selectedDaySeancesModel.dayNumber - 1]) {
        return;
      }
      const seancesToAttach = addedSeances[index]
        .weeks[data.selectedDaySeancesModel.weekNumber]
        .days[data.selectedDaySeancesModel.dayNumber - 1]
        .seancesTimes;
      data.selectedDaySeancesModel.seancesWithAddedByUser = Lodash.utils.cloneDeep(data.selectedDaySeancesModel.seances);

      if (seancesToAttach.length <= 0) {
        return;
      }
      seancesToAttach.forEach(seanceToAttach => {
        data.selectedDaySeancesModel.seancesWithAddedByUser.push(this._mapper.toSeanceApiModel(seanceToAttach));
      });

      data.selectedDaySeancesModel.seancesWithAddedByUser = Lodash.utils.orderBy(data.selectedDaySeancesModel.seancesWithAddedByUser, [
        a => {
          return (a as SeanceApiModel).start;
        }
      ]);

      this.setSeanceTimeValidator(data);
    }
  }

  private _getDateWithTime(week: number, day: number, time: Time): Date {
    const result = this.getDate(week, day);
    result.setHours(time.hours);
    result.setMinutes(time.minutes);
    result.setSeconds(0);
    result.setMilliseconds(0);

    return result;
  }

  private _getMovieProjectionsForSelectedDay(seanceRoomId: string, weekNumber: number, dayNumber: number): SeanceApiModel[] {
    const request: SeancesRequestModel = new SeancesRequestModel();
    request.screeningRoomId = seanceRoomId;
    request.date = this.getDate(weekNumber, dayNumber);

    return this._seanceService.getMoviesProjections(request);
  }

  private _removeWeek(data: SeanceComponentDataModel, weeksCount: number): void {
    const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
    const seanceRoom: ScreeningRoomApiModel = data.bookingForm.get('seanceRoom').value;
    const index = addedSeances.findIndex(x => x.id === seanceRoom.id);

    if (addedSeances[index].weeks.length > weeksCount) {
      while (addedSeances[index].weeks.length > weeksCount) {
        addedSeances[index].weeks.pop();
      }
    }

    data.bookingForm.get('addedSeances').setValue(addedSeances);
  }

  private _addWeek(data: SeanceComponentDataModel, weeksCount: number): void {
    const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];

    addedSeances.forEach(addedSeance => {
      if (addedSeance.weeks.length < weeksCount) {
        while (addedSeance.weeks.length < weeksCount) {
          addedSeance.weeks.push(new MovieProcessingWeekModel());
        }
      }
    });

    data.bookingForm.get('addedSeances').setValue(addedSeances);
  }

  private _getFisrtWeekDay(): any {
    return Luxon.utils.DateTime.local().minus(
      {
        days: this._getDaysToMinus()
      });
  }

  private _getDaysToMinus(): number {
    const curretDate = new Date();
    const currentDayOfWeekNumber = curretDate.getDay() === 0 ? 7 : curretDate.getDay();
    return currentDayOfWeekNumber - 1;
  }

  private _getAddMovieScreeningRooms(screeningRooms: ScreeningRoomApiModel[]): MovieProcessingScreeningRoomModel[] {
    const addMovieScreeningRooms: MovieProcessingScreeningRoomModel[] = [];

    screeningRooms.forEach(screeningRoom => {
      const addMoviescreeningRoom: MovieProcessingScreeningRoomModel = new MovieProcessingScreeningRoomModel();
      addMoviescreeningRoom.id = screeningRoom.id;
      addMovieScreeningRooms.push(addMoviescreeningRoom);
    });

    return addMovieScreeningRooms;
  }
}

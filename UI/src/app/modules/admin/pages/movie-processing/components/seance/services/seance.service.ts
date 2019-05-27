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
    private _apiService: SeanceApiService) {
  }

  public initComponent(bookingForm: FormGroup,
                       movieDuration: FormControl,
                       screeningRooms: ScreeningRoomApiModel[],
                       selectedDaySeancesModel: SelectedDaySeancesModel): SeanceComponentDataModel {
    const result = new SeanceComponentDataModel();

    const curretDate = new Date();
    result.currentDayNumber = curretDate.getDay() === 0 ? 7 : curretDate.getDay();
    result.selectedDayNumber = result.currentDayNumber;
    result.movieDuration = movieDuration;
    result.bookingForm = bookingForm;
    result.screeningRooms = screeningRooms;

    if (!result.bookingForm.get('weeksCount').value) {
      result.bookingForm.get('weeksCount').setValue(1);
      result.bookingForm.get('screeningRoom').setValue(result.screeningRooms[0]);
      result.bookingForm.get('addedSeances').setValue(this._getAddMovieScreeningRooms(result.screeningRooms));
    } else {
      const screeningRoomId = result.bookingForm.get('screeningRoom').value;
      const screeningRoom: ScreeningRoomApiModel = result.screeningRooms.find(sr => sr.id === screeningRoomId);
      result.bookingForm.get('screeningRoom').setValue(screeningRoom);
    }

    result.selectedDaySeances = selectedDaySeancesModel;
    result.selectedDaySeances.screeningRoomId = result.screeningRooms[0].id;
    this.setSeanceTimeValidator(result);

    return result;
  }

  public setSeanceTimeValidator(data: SeanceComponentDataModel): void {
    const selectedScreeningRoom: ScreeningRoomApiModel = data.bookingForm.get('screeningRoom').value;
    data.bookingForm.setControl('movieProjectionTime', new FormControl(
      null,
      [
        Validators.required,
        SeanceValidator.isValid(
          this.getDate(data.selectedWeekNumber, data.selectedDayNumber),
          data.selectedDaySeances.seancesWithAddedByUser,
          data.movieDuration,
          selectedScreeningRoom.breakBeforeAndAfterMovie)
      ]));
  }

  public isInvalid(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalid(bookingForm, formControlName);
  }

  public isInvalidAndTouched(formControlName: string, bookingForm: FormGroup): boolean {
    return this._formValidatorService.isInvalidAndTouched(bookingForm, formControlName);
  }

  // public getSelectedDaySeances(seanceRoomId: string, weekNumber: number, dayNumber: number): SelectedDaySeancesModel {
  //   const result = new SelectedDaySeancesModel();
  //   result.screeningRoomId = seanceRoomId;
  //   result.weekNumber = weekNumber;
  //   result.dayNumber = dayNumber;
  //
  //   return result;
  // }

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

  public setAddedSeances(data: SeanceComponentDataModel): void {
    const weeksCount = data.bookingForm.get('weeksCount').value;
    if (!this._movieHasSelectedScreeningRoom(data)) {
      console.log('wpaadło');
      this._addNewScreeningRoom(data);
    } else {
      this._removeWeek(data, weeksCount);
      this._addWeek(data, weeksCount);
    }
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

      const seancesOnDayFromWhichIndicatedSeanceWillBeRemoved = addedSeances[index].weeks[data.week].days[data.day];
      const indexOfseanceToRemove = seancesOnDayFromWhichIndicatedSeanceWillBeRemoved.seancesTimes.findIndex(
        projectionTime => projectionTime.start === data.seanceToRemove.start
          && projectionTime.end === data.seanceToRemove.end);

      const seanceToRemove = seancesOnDayFromWhichIndicatedSeanceWillBeRemoved.seancesTimes[indexOfseanceToRemove];
      if (seanceToRemove.seanceId && seanceToRemove.seanceId.length > 0) {
        data.removedSeances.push(seanceToRemove.seanceId);
      }

      seancesOnDayFromWhichIndicatedSeanceWillBeRemoved.seancesTimes.splice(indexOfseanceToRemove, 1);

      data.form.get('addedSeances').setValue(addedSeances);
    }
  }

  public attachAddedAndDetachRemovedSeancesToSelectedDaySeances(data: SeanceComponentDataModel): void {
    if (data.bookingForm.get('addedSeances')) {
      const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
      const seanceRoom: ScreeningRoomApiModel = data.bookingForm.get('screeningRoom').value;
      const seanceRoomIndex = addedSeances.findIndex(x => x.id === seanceRoom.id);

      if (!addedSeances[seanceRoomIndex]
        || !addedSeances[seanceRoomIndex].weeks
        || !addedSeances[seanceRoomIndex].weeks[data.selectedDaySeances.weekNumber]
        || !addedSeances[seanceRoomIndex].weeks[data.selectedDaySeances.weekNumber].days
        || !addedSeances[seanceRoomIndex].weeks[data.selectedDaySeances.weekNumber].days[data.selectedDaySeances.dayNumber - 1]) {
        return;
      }

      const seancesToAttach = addedSeances[seanceRoomIndex]
        .weeks[data.selectedDaySeances.weekNumber]
        .days[data.selectedDaySeances.dayNumber - 1]
        .seancesTimes;
      data.selectedDaySeances.seancesWithAddedByUser = Lodash.utils.cloneDeep(data.selectedDaySeances.seances);

      seancesToAttach.forEach(seanceToAttach => {
        if (!data.selectedDaySeances.seancesWithAddedByUser.find(s => s.seanceId === seanceToAttach.seanceId)) {
          data.selectedDaySeances.seancesWithAddedByUser.push(this._mapper.toSeanceApiModel(seanceToAttach));
        }
      });

      data.selectedDaySeances.seancesWithAddedByUser = Lodash.utils.orderBy(data.selectedDaySeances.seancesWithAddedByUser, [
        a => {
          return (a as SeanceApiModel).start;
        }
      ]);

      data.selectedDaySeances.seancesWithAddedByUser = data.selectedDaySeances.seancesWithAddedByUser.filter(s => {
        return !data.removedSeances.includes(s.seanceId);
      });

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

  // private async _getMovieProjectionsForSelectedDay(seanceRoomId: string, weekNumber: number, dayNumber: number): Promise<SeanceApiModel[]> {
  //   const request: SeancesRequestModel = new SeancesRequestModel();
  //   request.screeningRoomId = seanceRoomId;
  //   request.date = this.getDate(weekNumber, dayNumber);
  //
  //   let result = null;
  //   this._apiService.getMoviesProjections(request).subscribe(s => {
  //     result = s;
  //   });
  //
  //   return await this._apiService.getMoviesProjections(request).toPromise();
  // }

  private _addNewScreeningRoom(data: SeanceComponentDataModel): void {
    const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
    const newScreeningRoom = new MovieProcessingScreeningRoomModel();
    newScreeningRoom.id = (data.bookingForm.get('screeningRoom').value as ScreeningRoomApiModel).id;

    const emptyWeeks: MovieProcessingWeekModel[] = [];
    for (let i = 0; i < data.weekCount; i++) {
      const emptyWeek = new MovieProcessingWeekModel();
      emptyWeek.weekNumber = i;
      emptyWeeks.push(emptyWeek);
    }
    newScreeningRoom.weeks = emptyWeeks;
    addedSeances.push(newScreeningRoom);
    data.bookingForm.get('addedSeances').setValue(addedSeances);
  }

  private _movieHasSelectedScreeningRoom(data: SeanceComponentDataModel): boolean {
    if (!data.bookingForm.get('screeningRoom')
      || !data.bookingForm.get('screeningRoom').value
      || !data.bookingForm.get('addedSeances')
      || !data.bookingForm.get('addedSeances').value) {
      return false;
    }

    const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
    return addedSeances.findIndex(
      x => x.id === (data.bookingForm.get('screeningRoom').value as ScreeningRoomApiModel).id) >= 0;
  }

  private _removeWeek(data: SeanceComponentDataModel, weeksCount: number): void {

    const addedSeances = data.bookingForm.get('addedSeances').value as MovieProcessingScreeningRoomModel[];
    const screeningRoom: ScreeningRoomApiModel = data.bookingForm.get('screeningRoom').value;
    const screeningRoomIndex = addedSeances.findIndex(x => x.id === screeningRoom.id);

    if (addedSeances[screeningRoomIndex].weeks.length > weeksCount) {
      while (addedSeances[screeningRoomIndex].weeks.length > weeksCount) {
        addedSeances[screeningRoomIndex].weeks.pop();
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
    const result: MovieProcessingScreeningRoomModel[] = [];

    screeningRooms.forEach(screeningRoom => {
      const addMoviescreeningRoom: MovieProcessingScreeningRoomModel = new MovieProcessingScreeningRoomModel();
      addMoviescreeningRoom.id = screeningRoom.id;
      result.push(addMoviescreeningRoom);
    });

    return result;
  }
}

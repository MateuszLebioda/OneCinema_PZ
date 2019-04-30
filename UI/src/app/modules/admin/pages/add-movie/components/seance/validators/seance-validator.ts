import {AbstractControl, ValidatorFn} from '@angular/forms';
import {SelectedDaySeancesModel} from '../models/selected-day-seances.model';
import {DateTime} from 'luxon';
import {Time} from '@angular/common';
import {Luxon} from '../../../../../../../shared/helpers/external/luxon';

export class SeanceValidator {
  public static isValid(seanceDay: Date, seancesThisDay: SelectedDaySeancesModel, seanceDuration: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!seanceDuration || seanceDuration <= 0) {
        return {'emptySeanceDuration': true};
      }
      if (control.value && !this._isValid(control.value, seanceDay, seancesThisDay, seanceDuration)) {
        return {'wrongTime': true};
      }

      return null;
    };
  }

  private static convertToTime(time: string): Time {
    if (!time) {
      return null;
    }
    const x = time.split(':');

    if (x.length !== 2) {
      return null;
    }

    return {
      hours: Number(x[0].trim()),
      minutes: Number(x[1].trim())
    };
  }

  private static _isValid(seanceStartHour: string,
                          seanceDay: Date,
                          seancesThisDay: SelectedDaySeancesModel,
                          seanceDuration: number): boolean {
    const seanceTime: Time = this.convertToTime(seanceStartHour);
    if (!seanceTime) {
      return false;
    }

    if (seancesThisDay.seances.length <= 0) {
      return true;
    }

    seanceDay.setHours(seanceTime.hours);
    seanceDay.setMinutes(seanceTime.minutes);

    const seanceStart: Date = seanceDay;
    const seanceEnd: DateTime = Luxon.toDateTime(seanceStart).plus({minutes: seanceDuration});

    const indexOfSeanceBeforeValidatingSeance = seancesThisDay.seances.findIndex(currentSeance => currentSeance.start > seanceStart);
    if (indexOfSeanceBeforeValidatingSeance < 0) {
      return this._canSeanceBeLatest(
        Luxon.toDateTime(seanceStart), seanceEnd, Luxon.toDateTime(seancesThisDay.seances[seancesThisDay.seances.length - 1].end));
    }
    if (indexOfSeanceBeforeValidatingSeance === 0) {
      return this._canSeanceBeFirst(
        Luxon.toDateTime(seanceStart), seanceEnd, Luxon.toDateTime(seancesThisDay.seances[0].start));
    }

    return this._isSeanceBetweenPreviousAndNextSeances(
      seanceStart, Luxon.toDate(seanceEnd), seancesThisDay, indexOfSeanceBeforeValidatingSeance);
  }

  private static _canSeanceBeLatest(seanceStart: DateTime, seanceEnd: DateTime, endOfseanceBeforeValidatingSeance: DateTime): boolean {
    return seanceEnd < this._getDayEnd(seanceStart) && endOfseanceBeforeValidatingSeance < seanceStart;
  }

  private static _canSeanceBeFirst(seanceStart: DateTime, seanceEnd: DateTime, startOfSeanceBeforeValidatingSeance: DateTime): boolean {
    return seanceStart > this._getDayStart(seanceStart) && seanceEnd < startOfSeanceBeforeValidatingSeance;
  }

  private static _isSeanceBetweenPreviousAndNextSeances(seanceStart: Date,
                                                        seanceEnd: Date,
                                                        seancesThisDay: SelectedDaySeancesModel,
                                                        indexOfSeanceBeforeValidatingSeance: number): boolean {
    const endOfSeanceBeforeValidatingSeance = seancesThisDay.seances[indexOfSeanceBeforeValidatingSeance - 1].end;
    const startOfSeanceAfterValidatingSeance = seancesThisDay.seances[indexOfSeanceBeforeValidatingSeance].start;

    return seanceStart > endOfSeanceBeforeValidatingSeance && seanceEnd < startOfSeanceAfterValidatingSeance;
  }

  private static _getDayStart(date: DateTime): DateTime {
    const dayStart = Luxon.toDate(date);
    dayStart.setHours(0, 0, 0, 0);
    return Luxon.toDateTime(dayStart);
  }

  private static _getDayEnd(date: DateTime): DateTime {
    const dayEnd = Luxon.toDate(date);
    dayEnd.setHours(23, 59, 59, 999);
    return Luxon.toDateTime(dayEnd);
  }
}

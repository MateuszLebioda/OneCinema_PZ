import {AbstractControl, FormControl, ValidatorFn} from '@angular/forms';
import {DateTime} from 'luxon';
import {Time} from '@angular/common';
import {Luxon} from '../../../../../../../shared/helpers/external/luxon';
import {DateTimeService} from '../../../../../../../shared/helpers/internal/date-time.service';
import {SeanceApiModel} from '../models/api/seance-api.model';

export class SeanceValidator {
  private static _dateTimeService: DateTimeService = new DateTimeService();

  public static isValid(seanceDay: Date,
                        seancesThisDay: SeanceApiModel[],
                        movieDuration: FormControl,
                        breakBeforeAndAfterSeanse: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (movieDuration.invalid) {
        return {'emptySeanceDuration': true};
      }
      if (control.value && !this._isValid(
        control.value, seanceDay, seancesThisDay, movieDuration.value + breakBeforeAndAfterSeanse * 2)) {
        return {'wrongTime': true};
      }

      return null;
    };
  }

  private static _isValid(seanceStartHour: string,
                          seanceDay: Date,
                          seancesThisDay: SeanceApiModel[],
                          seanceDuration: number): boolean {
    const seanceTime: Time = this._dateTimeService.convertToTime(seanceStartHour);
    if (!seanceTime) {
      return false;
    }

    if (seancesThisDay.length <= 0) {
      return true;
    }

    seanceDay.setHours(seanceTime.hours);
    seanceDay.setMinutes(seanceTime.minutes);

    const seanceStart: Date = seanceDay;
    const seanceEnd: DateTime = Luxon.toDateTime(seanceStart).plus({minutes: seanceDuration});

    const indexOfSeanceBeforeValidatingSeance = seancesThisDay.findIndex(currentSeance => currentSeance.start > seanceStart);
    if (indexOfSeanceBeforeValidatingSeance < 0) {
      return this._canSeanceBeLatest(
        Luxon.toDateTime(seanceStart), seanceEnd, Luxon.toDateTime(seancesThisDay[seancesThisDay.length - 1].finish));
    }
    if (indexOfSeanceBeforeValidatingSeance === 0) {
      return this._canSeanceBeFirst(
        Luxon.toDateTime(seanceStart), seanceEnd, Luxon.toDateTime(seancesThisDay[0].start));
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
                                                        seancesThisDay: SeanceApiModel[],
                                                        indexOfSeanceBeforeValidatingSeance: number): boolean {
    const endOfSeanceBeforeValidatingSeance = seancesThisDay[indexOfSeanceBeforeValidatingSeance - 1].finish;
    const startOfSeanceAfterValidatingSeance = seancesThisDay[indexOfSeanceBeforeValidatingSeance].start;

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

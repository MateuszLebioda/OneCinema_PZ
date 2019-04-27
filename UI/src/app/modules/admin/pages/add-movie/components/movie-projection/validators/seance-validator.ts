import {AbstractControl, ValidatorFn} from '@angular/forms';
import {SelectedDayMoviesProjectionsModel} from '../models/selected-day-movies-projections.model';
import {DateTime} from 'luxon';
import {LuxonService} from '../../../../../../../shared/helpers/external/luxon.service';
import {Time} from '@angular/common';

export class SeanceValidator {
  private static _luxonService: LuxonService = new LuxonService();

  public static isValid(movieProjectionDay: Date,
                        currentMoviesProjections: SelectedDayMoviesProjectionsModel,
                        movieProjectionDuration: number,
                        breakBeforeAndAfterSeance: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (control.value && !this._isValid(
        control.value, movieProjectionDay, currentMoviesProjections, movieProjectionDuration, breakBeforeAndAfterSeance)) {
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

  private static _isValid(startOfProjectionx: string,
                          movieProjectionDay: Date,
                          currentMoviesProjections: SelectedDayMoviesProjectionsModel,
                          movieProjectionDuration: number,
                          breakBeforeAndAfterSeance: number): boolean {
    const movieProjectionTime: Time = this.convertToTime(startOfProjectionx);

    if (!movieProjectionTime) {
      return false;
    }

    movieProjectionDay.setHours(movieProjectionTime.hours);
    movieProjectionDay.setMinutes(movieProjectionTime.minutes);

    const startOfProjection: Date = movieProjectionDay;
    const indexOfMovieProjectionBeforeGivenDate = currentMoviesProjections.moviesProjections.findIndex(x => x.start > startOfProjection);
    const endOfProjectionBasedOnGivenDate = this._luxonService.DateTime.fromISO(startOfProjection
      .toISOString())
      .plus({minutes: movieProjectionDuration + (breakBeforeAndAfterSeance * 2)});

    if (indexOfMovieProjectionBeforeGivenDate < 0) {
      return this._canMovieProjectionBeLastProjectionOfGaveDay(endOfProjectionBasedOnGivenDate, movieProjectionDuration);
    }

    if (indexOfMovieProjectionBeforeGivenDate === 0) {
      return this._canMovieProjectionBeFirstProjectionOfGaveDay(
        currentMoviesProjections, endOfProjectionBasedOnGivenDate, movieProjectionDuration);
    }

    const endOfMovieProjectionBeforeGivenDate = currentMoviesProjections.moviesProjections[indexOfMovieProjectionBeforeGivenDate - 1].end;
    const startOfMovieProjectionAfterGivenDate = currentMoviesProjections.moviesProjections[indexOfMovieProjectionBeforeGivenDate].start;

    return endOfMovieProjectionBeforeGivenDate < startOfProjection &&
      startOfMovieProjectionAfterGivenDate > startOfProjection &&
      this._luxonService.Interval
        .fromDateTimes(endOfMovieProjectionBeforeGivenDate, startOfMovieProjectionAfterGivenDate)
        .length('minutes') > movieProjectionDuration;
  }

  private static _canMovieProjectionBeLastProjectionOfGaveDay(endOfProjectionBasedOnGivenDate: DateTime,
                                                              movieProjectionDuration: number): boolean {
    const daysEnd = new Date(endOfProjectionBasedOnGivenDate.toISODate());
    daysEnd.setHours(23, 59, 59, 999);
    const daysEndAsDateTime = this._luxonService.DateTime.fromISO(daysEnd.toISOString());

    const x = daysEndAsDateTime > endOfProjectionBasedOnGivenDate;
    const y = this._luxonService.Interval
      .fromDateTimes(endOfProjectionBasedOnGivenDate, daysEndAsDateTime)
      .length('minutes');

    return daysEndAsDateTime > endOfProjectionBasedOnGivenDate &&
      this._luxonService.Interval
        .fromDateTimes(endOfProjectionBasedOnGivenDate, daysEndAsDateTime)
        .length('minutes') > movieProjectionDuration;
  }

  private static _canMovieProjectionBeFirstProjectionOfGaveDay(currentMoviesProjections: SelectedDayMoviesProjectionsModel,
                                                               endOfProjectionBasedOnGivenDate: DateTime,
                                                               movieProjectionDuration: number): boolean {
    const daysStart = new Date(endOfProjectionBasedOnGivenDate.toISODate());
    daysStart.setHours(0, 0, 0, 0);
    const daysStartAsDateTime = this._luxonService.DateTime.fromISO(daysStart.toISOString());

    const x = daysStartAsDateTime < endOfProjectionBasedOnGivenDate;
    const y = this._luxonService.Interval
      .fromDateTimes(daysStartAsDateTime, currentMoviesProjections.moviesProjections[0].start)
      .length('minutes');

    return daysStartAsDateTime < endOfProjectionBasedOnGivenDate &&
      this._luxonService.Interval
        .fromDateTimes(daysStartAsDateTime, currentMoviesProjections.moviesProjections[0].start)
        .length('minutes') > movieProjectionDuration;
  }
}

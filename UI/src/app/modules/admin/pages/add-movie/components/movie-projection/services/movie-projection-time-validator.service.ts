import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {LuxonService} from '../../../../../../../shared/helpers/external/luxon.service';
import {SelectedDayMoviesProjectionsModel} from '../models/selected-day-movies-projections.model';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProjectionTimeValidatorService {

  constructor(private _luxonService: LuxonService) {
  }

  public isValid(startOfProjection: Date,
                 currentMoviesProjections: SelectedDayMoviesProjectionsModel,
                 movieProjectionDuration: number,
                 breakBeforeAndAfterSeance: number): boolean {
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

  private _canMovieProjectionBeLastProjectionOfGaveDay(endOfProjectionBasedOnGivenDate: DateTime,
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

  private _canMovieProjectionBeFirstProjectionOfGaveDay(currentMoviesProjections: SelectedDayMoviesProjectionsModel,
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

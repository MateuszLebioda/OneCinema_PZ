import { WeekDays } from '../enums/week-days.enum';
import { AddMovieProjectionTimeModel } from './add-movie-projection-time.model';

export class AddMovieDayModel {
  public day: WeekDays;
  public projectionTimes: AddMovieProjectionTimeModel[];

  constructor() {
    this.projectionTimes = [];
  }
}

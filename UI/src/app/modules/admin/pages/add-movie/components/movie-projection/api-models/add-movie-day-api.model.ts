import {WeekDays} from '../enums/week-days.enum';
import {AddMovieProjectionTimeApiModel} from './add-movie-projection-time-api.model';

export class AddMovieDayApiModel {
  public day: WeekDays;
  public projectionTimes: AddMovieProjectionTimeApiModel[];

  constructor() {
    this.projectionTimes = [];
  }
}

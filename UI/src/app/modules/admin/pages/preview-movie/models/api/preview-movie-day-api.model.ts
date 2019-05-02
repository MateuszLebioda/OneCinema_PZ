import {PreviewMovieProjectionTimeApiModel} from './preview-movie-projection-time-api.model';
import {WeekDays} from '../../../add-movie/components/seance/enums/week-days.enum';

export class PreviewMovieDayApiModel {
  public day: WeekDays;
  public projectionTimes: PreviewMovieProjectionTimeApiModel[];

  constructor() {
    this.projectionTimes = [];
  }
}

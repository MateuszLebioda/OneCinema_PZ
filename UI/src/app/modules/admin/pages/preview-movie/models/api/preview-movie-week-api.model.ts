import {PreviewMovieDayApiModel} from './preview-movie-day-api.model';
import {WeekRangeApiModel} from './week-range-api.model';

export class PreviewMovieWeekApiModel {
  public weekRange: WeekRangeApiModel;
  public days: PreviewMovieDayApiModel[];

  constructor() {
    this.days = [];
    this.weekRange = new WeekRangeApiModel();
  }
}

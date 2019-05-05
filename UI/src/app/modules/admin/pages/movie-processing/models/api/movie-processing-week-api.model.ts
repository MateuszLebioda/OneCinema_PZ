import {MovieProcessingDayApiModel} from './movie-processing-day-api.model';

export class MovieProcessingWeekApiModel {
  public weekNumber: number;
  public days: MovieProcessingDayApiModel[];

  constructor() {
    this.days = [];
  }
}

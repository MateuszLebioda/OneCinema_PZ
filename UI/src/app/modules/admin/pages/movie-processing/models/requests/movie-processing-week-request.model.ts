import {MovieProcessingDayRequestModel} from './movie-processing-day-request.model';

export class MovieProcessingWeekRequestModel {
  public weekNumber: number;
  public days: MovieProcessingDayRequestModel[];

  constructor() {
    this.days = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      this.days.push(new MovieProcessingDayRequestModel());
    }
  }
}

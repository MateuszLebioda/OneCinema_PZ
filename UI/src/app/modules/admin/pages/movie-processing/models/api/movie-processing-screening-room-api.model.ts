import {MovieProcessingWeekApiModel} from './movie-processing-week-api.model';

export class MovieProcessingScreeningRoomApiModel {
  public id: string;
  public weeks: MovieProcessingWeekApiModel[];

  constructor() {
    this.weeks = [];
  }
}

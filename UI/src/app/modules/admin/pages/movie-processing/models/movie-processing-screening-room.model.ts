import {MovieProcessingWeekModel} from './movie-processing-week.model';

export class MovieProcessingScreeningRoomModel {
  public id: string;
  public weeks: MovieProcessingWeekModel[];

  constructor() {
    this.weeks = [];
  }
}

import {MovieProcessingWeekRequestModel} from './movie-processing-week-request.model';

export class MovieProcessingScreeningRoomRequestModel {
  public id: string;
  public weeks: MovieProcessingWeekRequestModel[];
}

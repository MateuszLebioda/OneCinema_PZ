import {MovieProcessingSeanceTimeRequestModel} from './movie-processing-seance-time-request.model';

export class MovieProcessingScreeningRoomRequestModel {
  public id: string;
  public seances: MovieProcessingSeanceTimeRequestModel[];
}

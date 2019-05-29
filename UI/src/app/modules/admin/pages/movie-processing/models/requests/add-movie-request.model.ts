import {MovieProcessingScreeningRoomRequestModel} from './movie-processing-screening-room-request.model';

export class AddMovieRequestModel {
  public title: string;
  public rating: number;
  public genders: string[];
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public screeningRooms: MovieProcessingScreeningRoomRequestModel[];

  constructor() {
    this.genders = [];
    this.screeningRooms = [];
  }
}

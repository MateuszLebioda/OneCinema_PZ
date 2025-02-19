import {MovieProcessingScreeningRoomApiModel} from './movie-processing-screening-room-api.model';

export class MovieProcessingApiModel {
  public id: string;
  public title: string;
  public genders: string[];
  public duration: number;
  public rating: number;
  public posterUrl: string;
  public trailerUrl: string;
  public screeningRooms: MovieProcessingScreeningRoomApiModel[];

  constructor() {
    this.genders = [];
    this.screeningRooms = [];
  }
}

import {MovieProcessingScreeningRoomModel} from './movie-processing-screening-room.model';

export class MovieProcessingModel {
  public id: string;
  public title: string;
  public genders: string[];
  public duration: number;
  public rating: number;
  public posterUrl: string;
  public trailerUrl: string;
  public screeningRooms: MovieProcessingScreeningRoomModel[];

  constructor() {
    this.rating = 3;
    this.genders = [];
    this.screeningRooms = [];
  }
}

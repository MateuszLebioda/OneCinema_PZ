import {PreviewMovieScreeningRoomApiModel} from './preview-movie-screening-room-api.model';

export class PreviewMovieApiModel {
  public id: string;
  public title: string;
  public rate: number;
  public genders: string[];
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public screeningRooms: PreviewMovieScreeningRoomApiModel[];

  constructor() {
    this.genders = [];
    this.screeningRooms = [];
  }
}

import {MovieGender} from '../../../../../movie/enums/movie-gender.enum';
import {MovieProcessingSreeningRoomRequestModel} from './movie-processing-sreening-room-request.model';

export class MovieProcessingRequestModel {
  public title: string;
  public rating: number;
  public genders: MovieGender[];
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public screeningRooms: MovieProcessingSreeningRoomRequestModel[];

  constructor() {
    this.genders = [];
    this.screeningRooms = [];
  }
}

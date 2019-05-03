import {MovieGender} from '../../../../../movie/enums/movie-gender.enum';
import {AddMovieSreeningRoomRequestModel} from './add-movie-sreening-room-request.model';

export class AddMovieRequestModel {
  public title: string;
  public rate: number;
  public genders: MovieGender[];
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public screeningRooms: AddMovieSreeningRoomRequestModel[];

  constructor() {
    this.genders = [];
    this.screeningRooms = [];
  }
}

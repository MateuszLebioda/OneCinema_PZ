import {MovieGender} from '../../../../../movie/enums/movie-gender.enum';
import {AddSeanceWeekRequestModel} from './add-seance-week-request.model';

export class AddMovieRequestModel {
  public title: string;
  public rate: number;
  public genders: MovieGender[];
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public seanceRoomId: string;
  public seances: AddSeanceWeekRequestModel[];

  constructor() {
    this.genders = [];
    this.seances = [];
  }
}

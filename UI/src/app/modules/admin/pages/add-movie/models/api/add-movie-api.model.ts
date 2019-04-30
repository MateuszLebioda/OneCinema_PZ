import {MovieGender} from '../../../../../movie/enums/movie-gender.enum';

export class AddMovieApiModel {
  public title: string;
  public genders: MovieGender[];
  public duration: number;
  public rate: number;
  public posterUrl: string;
  public trailerUrl: string;

  constructor() {
    this.rate = 3;
    this.genders = [];
  }
}

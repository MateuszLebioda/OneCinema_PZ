import {AddMovieWeekApiModel} from './add-movie-week-api.model';

export class AddMovieApiModel {
  public weeks: AddMovieWeekApiModel[];

  constructor() {
    this.weeks = [];
  }
}

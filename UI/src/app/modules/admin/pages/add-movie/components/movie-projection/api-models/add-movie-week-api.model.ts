import {AddMovieDayApiModel} from './add-movie-day-api.model';

export class AddMovieWeekApiModel {
  public days: AddMovieDayApiModel[];

  constructor() {
    this.days = [];
  }
}

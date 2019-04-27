import {AddMovieDayApiModel} from './add-movie-day-api.model';

export class AddMovieWeekApiModel {
  public days: AddMovieDayApiModel[];

  constructor() {
    this.days = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      this.days.push(new AddMovieDayApiModel());
    }
  }
}

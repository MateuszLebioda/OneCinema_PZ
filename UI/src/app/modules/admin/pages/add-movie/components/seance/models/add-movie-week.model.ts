import {AddMovieDayModel} from './add-movie-day.model';

export class AddMovieWeekModel {
  public weekNumber: number;
  public days: AddMovieDayModel[];

  constructor() {
    this.days = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      this.days.push(new AddMovieDayModel());
    }
  }
}

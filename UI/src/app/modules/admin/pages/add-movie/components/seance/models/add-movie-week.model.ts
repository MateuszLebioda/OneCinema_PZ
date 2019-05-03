import {AddMovieDayModel} from './add-movie-day.model';
import {WeekDays} from '../enums/week-days.enum';

export class AddMovieWeekModel {
  public weekNumber: number;
  public days: AddMovieDayModel[];

  constructor() {
    this.days = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      const day = new AddMovieDayModel();
      day.day = this._getDayName(dayIndex);
      this.days.push(day);
    }
  }

  private _getDayName(dayIndex: number): WeekDays {
    switch (dayIndex) {
      case 0:
        return WeekDays.Monday;
      case 1:
        return WeekDays.Tuesday;
      case 2:
        return WeekDays.Wednesday;
      case 3:
        return WeekDays.Thursday;
      case 4:
        return WeekDays.Friday;
      case 5:
        return WeekDays.Saturday;
      case 6:
        return WeekDays.Sunday;
    }
  }
}

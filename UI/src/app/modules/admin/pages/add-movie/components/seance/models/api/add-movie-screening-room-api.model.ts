import {AddMovieWeekModel} from '../add-movie-week.model';

export class AddMovieScreeningRoomApiModel {
  public id: string;
  public weeks: AddMovieWeekModel[];

  constructor() {
    this.weeks = [];
  }
}

import {MovieProjectionApiModel} from './api/movie-projection-api.model';

export class SelectedDayMoviesProjectionsModel {
  public weekNumber: number;
  public dayNumber: number;
  public moviesProjections: MovieProjectionApiModel[];

  constructor() {
    this.moviesProjections = [];
  }
}

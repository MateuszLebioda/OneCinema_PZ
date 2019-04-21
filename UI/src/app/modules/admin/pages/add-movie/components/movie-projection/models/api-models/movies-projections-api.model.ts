import {MovieProjectionApiModel} from './movie-projection-api.model';

export class MoviesProjectionsApiModel {
  public projections: MovieProjectionApiModel[];

  constructor() {
    this.projections = [];
  }
}

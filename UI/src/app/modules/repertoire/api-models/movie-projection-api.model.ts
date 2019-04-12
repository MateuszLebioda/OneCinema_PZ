import {SeanceApiModel} from './seance-api.model';

export class MovieProjectionApiModel {
  public movieId: string;
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seances: SeanceApiModel[];

  constructor() {
    this.seances = [];
  }
}

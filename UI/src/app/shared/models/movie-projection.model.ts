import {Seance} from './seance.model';

export class MovieProjection {
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seances: Seance[];

  constructor() {
    this.seances = [];
  }
}

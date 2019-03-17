import {Seance} from '../models/seance.model';

export class MovieProjectionViewModel {
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

import {Seance} from './seance.model';

export class MovieProjection {
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seancesUntilNoon: Seance[];
  public seancesAfternoon: Seance[];
  public seancesEvening: Seance[];

  constructor() {
    this.seancesUntilNoon = [];
    this.seancesAfternoon = [];
    this.seancesEvening = [];
  }
}

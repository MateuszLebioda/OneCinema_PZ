import {SeancesPerTimesOfDay} from './seances-per-times-of-day';

export class MovieProjection {
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seances: SeancesPerTimesOfDay;

  constructor() {
    this.seances = new SeancesPerTimesOfDay();
  }
}

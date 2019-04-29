import {SeancesPerTimesOfDay} from './seances-per-times-of-day';

export class MovieProjection {
  public movieId: string;
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieGenders: string[];
  public seances: SeancesPerTimesOfDay;

  constructor() {
    this.seances = new SeancesPerTimesOfDay();
    this.movieGenders = [];
  }
}

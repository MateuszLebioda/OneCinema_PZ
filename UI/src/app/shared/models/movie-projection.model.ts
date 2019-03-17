export class MovieProjection {
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seancesUntilNoon: Date[];
  public seancesAfternoon: Date[];
  public seancesEvening: Date[];

  constructor() {
    this.seancesUntilNoon = [];
    this.seancesAfternoon = [];
    this.seancesEvening = [];
  }
}

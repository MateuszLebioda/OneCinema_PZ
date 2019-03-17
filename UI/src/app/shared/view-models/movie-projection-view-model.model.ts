export class MovieProjectionViewModel {
  public movieTitle: string;
  public projectionType: string;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieCategory: string;
  public seances: Date[];

  constructor() {
    this.seances = [];
  }
}

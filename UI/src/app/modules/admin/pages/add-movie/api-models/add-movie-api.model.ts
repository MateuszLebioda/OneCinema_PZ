export class AddMovieApiModel {
  public title: string;
  public gender: string;
  public duration: number;
  public rate: number;
  public posterUrl: string;
  public trailerUrl: string;

  constructor() {
    this.rate = 3;
  }
}

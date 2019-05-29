export class MovieShortInfoApiModel {
  public id: string;
  public title: string;
  public posterUrl: string;
  public trailerUrl: string;
  public yearOfPremiere: number;
  public rating: number;

  constructor() {
    this.posterUrl = 'https://www.freeiconspng.com/uploads/no-image-icon-4.png';
    this.trailerUrl = 'https://www.youtube.com/embed/76BDpHRdRxU';
  }
}

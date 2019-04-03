import {SeancesPerDay} from './seances-per-day.model';

export class Movie {
  public title: string;
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public gender: string;
  public rating: number;
  public seances2D: SeancesPerDay[];
  public seances3D: SeancesPerDay[];


  constructor() {
    this.seances2D = [];
    this.seances3D = [];
  }
}

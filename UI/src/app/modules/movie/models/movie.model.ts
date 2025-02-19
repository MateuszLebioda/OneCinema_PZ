import {SeancesPerDay} from './seances-per-day.model';

export class Movie {
  public title: string;
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public genders: string[];
  public rating: number;
  public seances2D: SeancesPerDay[];
  public seances3D: SeancesPerDay[];


  constructor() {
    this.title = '';
    this.posterUrl = '';
    this.trailerUrl = '';
    this.duration = 60;
    this.genders = [];
    this.rating = 3;
    this.seances2D = [];
    this.seances3D = [];
  }
}

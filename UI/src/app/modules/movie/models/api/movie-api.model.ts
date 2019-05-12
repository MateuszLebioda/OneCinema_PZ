import {DaySeancesApiModel} from './day-seances-api.model';

export class MovieApiModel {
  public title: string;
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public genders: string[];
  public rating: number;
  public seances2D: DaySeancesApiModel[];
  public seances3D: DaySeancesApiModel[];

  constructor() {
    this.seances2D = [];
    this.seances3D = [];
  }
}

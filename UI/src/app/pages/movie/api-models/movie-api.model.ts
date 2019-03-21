import {DaySeancesApiModel} from './day-seances-api.model';

export class MovieApiModel {
  public title: string;
  public description: string;
  public projectionType: string;
  public posterUrl: string;
  public trailerUrl: string;
  public duration: number;
  public category: string;
  public rating: number;
  public seances: DaySeancesApiModel[];

  constructor() {
    this.seances = [];
  }
}

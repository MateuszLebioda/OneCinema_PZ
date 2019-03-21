import {SeancesPerDay} from './seances-per-day.model';

export class Movie {
  public title: string;
  public description: string;
  public projectionType: string;
  public posterUrl: string;
  public duration: number;
  public category: string;
  public rating: number;
  public seances: SeancesPerDay[];

  constructor() {
    this.seances = [];
  }
}

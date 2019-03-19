import {DaySeances} from './day-seances.model';

export class Movie {
  public title: string;
  public description: string;
  public projectionType: string;
  public posterUrl: string;
  public duration: number;
  public category: string;
  public rating: number;
  public seances: DaySeances[];

  constructor() {
    this.seances = [];
  }
}

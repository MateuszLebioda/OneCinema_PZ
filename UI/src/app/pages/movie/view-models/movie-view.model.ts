import {DaySeancesViewModel} from './day-seances-view.model';

export class MovieViewModel {
  public title: string;
  public description: string;
  public projectionType: string;
  public posterUrl: string;
  public duration: number;
  public category: string;
  public rating: number;
  public seances: DaySeancesViewModel[];

  constructor() {
    this.seances = [];
  }
}

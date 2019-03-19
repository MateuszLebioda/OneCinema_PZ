import {Seance} from '../../repertoire/models/seance.model';

export class DaySeances {
  public day: number;
  public seancesUntilNoon: Seance[];
  public seancesAfternoon: Seance[];
  public seancesEvening: Seance[];

  constructor() {
    this.seancesUntilNoon = [];
    this.seancesAfternoon = [];
    this.seancesEvening = [];
  }
}

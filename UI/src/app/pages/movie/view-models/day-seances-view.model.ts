import {Seance} from '../../repertoire/models/seance.model';

export class DaySeancesViewModel {
  public day: number;
  public seances: Seance[];

  constructor() {
    this.seances = [];
  }
}

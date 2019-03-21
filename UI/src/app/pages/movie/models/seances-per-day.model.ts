import {SeancesPerTimesOfDay} from '../../repertoire/models/seances-per-times-of-day';

export class SeancesPerDay {
  public day: number;
  public seances: SeancesPerTimesOfDay;

  constructor() {
    this.seances = new SeancesPerTimesOfDay();
  }
}

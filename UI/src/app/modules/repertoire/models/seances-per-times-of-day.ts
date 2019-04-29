import {SeanceApiModel} from './api/seance-api.model';

export class SeancesPerTimesOfDay {
  public seancesUntilNoon: SeanceApiModel[];
  public seancesAfternoon: SeanceApiModel[];
  public seancesEvening: SeanceApiModel[];

  constructor() {
    this.seancesUntilNoon = [];
    this.seancesAfternoon = [];
    this.seancesEvening = [];
  }
}

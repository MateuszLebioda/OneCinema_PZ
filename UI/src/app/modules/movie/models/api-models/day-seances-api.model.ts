import {SeanceApiModel} from '../../../repertoire/models/api-models/seance-api.model';

export class DaySeancesApiModel {
  public day: number;
  public seances: SeanceApiModel[];

  constructor() {
    this.seances = [];
  }
}

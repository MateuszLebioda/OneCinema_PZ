import {SeanceApiModel} from './seance-api.model';

export class SeancesApiModel {
  public projections: SeanceApiModel[];

  constructor() {
    this.projections = [];
  }
}

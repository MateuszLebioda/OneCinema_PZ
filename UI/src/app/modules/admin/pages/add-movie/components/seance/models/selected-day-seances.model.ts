import {SeanceApiModel} from './api/seance-api.model';

export class SelectedDaySeancesModel {
  public weekNumber: number;
  public dayNumber: number;
  public seances: SeanceApiModel[];

  constructor() {
    this.seances = [];
  }
}

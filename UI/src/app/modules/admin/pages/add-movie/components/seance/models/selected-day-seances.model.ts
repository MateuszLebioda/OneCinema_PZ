import {SeanceApiModel} from './api/seance-api.model';
import {Lodash} from '../../../../../../../shared/helpers/external/lodash';

export class SelectedDaySeancesModel {
  public set seances(seances: SeanceApiModel[]) {
    this._seances = seances;
    this.seancesWithAddedByUser = Lodash.utils.cloneDeep(seances);
  }

  public get seances(): SeanceApiModel[] {
    return this._seances;
  }

  public seanceRoomId: string;
  public weekNumber: number;
  public dayNumber: number;
  public addedSeances: number;
  public seancesWithAddedByUser: SeanceApiModel[];

  private _seances: SeanceApiModel[];

  constructor() {
    this.seances = [];
    this.seancesWithAddedByUser = [];
  }
}

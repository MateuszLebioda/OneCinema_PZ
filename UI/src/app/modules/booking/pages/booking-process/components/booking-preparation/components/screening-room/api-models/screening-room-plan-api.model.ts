import {ScreeningRoomPlanRowApiModel} from './screening-room-plan-row-api.model';

export class ScreeningRoomPlanApiModel {
  public id: string;
  public screeningRoomName: string;
  public rows: ScreeningRoomPlanRowApiModel[];

  constructor() {
    this.rows = [];
  }
}

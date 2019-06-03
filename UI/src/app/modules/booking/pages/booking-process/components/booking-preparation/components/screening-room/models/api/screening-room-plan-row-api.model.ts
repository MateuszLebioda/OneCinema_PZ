import {ScreeningRoomPlanSeatApiModel} from './screening-room-plan-seat-api.model';

export class ScreeningRoomPlanRowApiModel {
  public row: number;
  public seats: ScreeningRoomPlanSeatApiModel[];

  constructor() {
    this.seats = [];
  }
}

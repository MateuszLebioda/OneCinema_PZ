import {AddSeanceTimeRequestModel} from './add-seance-time-request.model';

export class AddSeanceDayRequestModel {
  public projectionTimes: AddSeanceTimeRequestModel[];

  constructor() {
    this.projectionTimes = [];
  }
}

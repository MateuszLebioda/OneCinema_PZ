import {AddSeanceWeekRequestModel} from './add-seance-week-request.model';

export class AddSeanceRequestModel {
  public weeks: AddSeanceWeekRequestModel[];

  constructor() {
    this.weeks = [];
  }
}

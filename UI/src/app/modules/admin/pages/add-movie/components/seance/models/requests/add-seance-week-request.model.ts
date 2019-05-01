import {AddSeanceDayRequestModel} from './add-seance-day-request.model';

export class AddSeanceWeekRequestModel {
  public days: AddSeanceDayRequestModel[];

  constructor() {
    this.days = [];
    for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
      this.days.push(new AddSeanceDayRequestModel());
    }
  }
}

import {AddSeanceTimeRequestModel} from './add-seance-time-request.model';
import {WeekDays} from '../../components/seance/enums/week-days.enum';

export class AddSeanceDayRequestModel {
  public day: WeekDays;
  public projectionTimes: AddSeanceTimeRequestModel[];

  constructor() {
    this.projectionTimes = [];
  }
}

import {MovieProcessingSeanceTimeRequestModel} from './movie-processing-seance-time-request.model';
import {WeekDays} from '../../components/seance/enums/week-days.enum';

export class MovieProcessingDayRequestModel {
  public day: WeekDays;
  public seancesTimes: MovieProcessingSeanceTimeRequestModel[];

  constructor() {
    this.seancesTimes = [];
  }
}

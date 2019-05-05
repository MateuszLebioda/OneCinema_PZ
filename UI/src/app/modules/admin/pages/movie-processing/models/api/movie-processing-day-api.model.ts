import {WeekDays} from '../../components/seance/enums/week-days.enum';
import {MovieProcessingSeanceTimeApiModel} from './movie-processing-seance-time-api.model';

export class MovieProcessingDayApiModel {
  public day: WeekDays;
  public seancesTimes: MovieProcessingSeanceTimeApiModel[];

  constructor() {
    this.seancesTimes = [];
  }
}

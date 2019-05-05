import { WeekDays } from '../components/seance/enums/week-days.enum';
import { MovieProcessingSeanceTimeModel } from './movie-processing-seance-time.model';

export class MovieProcessingDayModel {
  public day: WeekDays;
  public seancesTimes: MovieProcessingSeanceTimeModel[];

  constructor() {
    this.seancesTimes = [];
  }
}

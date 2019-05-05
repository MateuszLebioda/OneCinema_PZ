import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {WeekDays} from '../../../../movie-processing/components/seance/enums/week-days.enum';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieSeancesPreviewService {

  constructor() { }

  public convertToPolishDayName(day: WeekDays) {
    switch (day) {
      case WeekDays.Monday:
        return 'Poniedziałek';
      case WeekDays.Tuesday:
        return 'Wtorek';
      case WeekDays.Wednesday:
        return 'Środa';
      case WeekDays.Thursday:
        return 'Czwartek';
      case WeekDays.Friday:
        return 'Piątek';
      case WeekDays.Saturday:
        return 'Sobota';
      case WeekDays.Sunday:
        return 'Niedziela';
    }
  }
}

import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {WeekDays} from '../../../../add-movie/components/seance/enums/week-days.enum';

@Injectable({
  providedIn: AdminServicesModule
})
export class PreviewMovieSeancesService {

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

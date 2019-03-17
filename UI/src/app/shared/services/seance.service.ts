import {Injectable} from '@angular/core';
import {SharedModule} from '../shared.module';
import {SeanceStatusCssClass} from '../enums/seance-status-css-class.enum';
import {Seance} from '../models/seance.model';

@Injectable({
  providedIn: SharedModule
})
export class SeanceService {
  private readonly maxBookingOffsetInMilliseconds = 1800000;

  public getSeanceCssClass(seanceDate: Seance): string {
    const currentTimeInMilliseconds = new Date().getTime();
    const seanceStartDateTimeInMilliseconds = seanceDate.start.getTime();
    const seanceFinishDateTimeInMilliseconds = seanceDate.finish.getTime();
    const maxBookingTime = currentTimeInMilliseconds - this.maxBookingOffsetInMilliseconds;

    if (seanceStartDateTimeInMilliseconds < maxBookingTime) {
      console.log(SeanceStatusCssClass.available);
      return SeanceStatusCssClass.available;
    } else if (seanceFinishDateTimeInMilliseconds < currentTimeInMilliseconds) {
      console.log(SeanceStatusCssClass.running);
      return SeanceStatusCssClass.running;
    } else {
      console.log(SeanceStatusCssClass.past);
      return SeanceStatusCssClass.past;
    }
  }
}

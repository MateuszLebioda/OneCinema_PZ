import {Injectable} from '@angular/core';
import {SharedModule} from '../shared.module';
import {SeanceStatusCssClass} from '../enums/seance-status-css-class.enum';
import {Seance} from '../models/seance.model';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Injectable({
  providedIn: SharedModule
})
export class SeanceService {
  private readonly maxBookingOffsetInMilliseconds = 1800000;

  public getSeanceCssClass(seanceDate: Seance): string {
    const currentTimeInMilliseconds = Date.now();
    const seanceStartDateTimeInMilliseconds = seanceDate.start.getTime();
    const seanceFinishDateTimeInMilliseconds = seanceDate.finish.getTime();
    const maxBookingTime = currentTimeInMilliseconds + this.maxBookingOffsetInMilliseconds;

    if (seanceStartDateTimeInMilliseconds > maxBookingTime) {
      return SeanceStatusCssClass.available;
    } else if (currentTimeInMilliseconds < seanceFinishDateTimeInMilliseconds) {
      return SeanceStatusCssClass.running;
    } else {
      return SeanceStatusCssClass.past;
    }
  }
}

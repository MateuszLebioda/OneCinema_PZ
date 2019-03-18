import {Injectable} from '@angular/core';
import {SeanceStatus} from '../enums/seance-statu.enum';
import {Seance} from '../models/seance.model';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  private readonly maxBookingOffsetInMilliseconds = 1800000;

  public getSeanceStatus(seanceDate: Seance): SeanceStatus {
    const currentTimeInMilliseconds = Date.now();
    const seanceStartDateTimeInMilliseconds = seanceDate.start.getTime();
    const seanceFinishDateTimeInMilliseconds = seanceDate.finish.getTime();
    const maxBookingTime = currentTimeInMilliseconds + this.maxBookingOffsetInMilliseconds;

    if (seanceStartDateTimeInMilliseconds > maxBookingTime) {
      return SeanceStatus.available;
    } else if (currentTimeInMilliseconds < seanceFinishDateTimeInMilliseconds) {
      return SeanceStatus.running;
    } else {
      return SeanceStatus.past;
    }
  }
}

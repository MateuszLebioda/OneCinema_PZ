import {Injectable} from '@angular/core';
import {Time} from '@angular/common';
import {SharedServicesModule} from '../../shared-services.module';

@Injectable({
  providedIn: SharedServicesModule
})
export class DateTimeService {
  public convertToTime(time: string): Time {
    if (!time) {
      return null;
    }
    const x = time.split(':');

    if (x.length !== 2) {
      return null;
    }

    return {
      hours: Number(x[0].trim()),
      minutes: Number(x[1].trim())
    };
  }
}

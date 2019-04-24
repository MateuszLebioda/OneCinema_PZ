import {Injectable} from '@angular/core';
import {SharedServicesModule} from '../../shared-services.module';
import {DateTime} from 'luxon';
import {Interval} from 'luxon';

@Injectable({
  providedIn: SharedServicesModule
})
export class LuxonService {
  public DateTime = DateTime;
  public Interval = Interval;
}

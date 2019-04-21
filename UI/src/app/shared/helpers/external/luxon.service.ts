import {Injectable} from '@angular/core';
import {SharedServicesModule} from '../../shared-services.module';
import {DateTime} from 'luxon';

@Injectable({
  providedIn: SharedServicesModule
})
export class LuxonService {
  public dateTime: DateTime;

  constructor() {
    this.dateTime = DateTime;
  }
}

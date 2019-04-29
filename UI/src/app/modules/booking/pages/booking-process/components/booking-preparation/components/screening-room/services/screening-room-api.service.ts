import {Injectable} from '@angular/core';
import {ScreeningRoomPlanApiModel} from '../models/api/screening-room-plan-api.model';
import {BookedSeatsApiModel} from '../models/api/booked-seats/booked-seats-api.model';
import {ScreeningRoomPlanRowApiModel} from '../models/api/screening-room-plan-row-api.model';
import {ScreeningRoomPlanSeatApiModel} from '../models/api/screening-room-plan-seat-api.model';
import {BookingServicesModule} from '../../../../../../../booking-services.module';

@Injectable({
  providedIn: BookingServicesModule
})
export class ScreeningRoomApiService {

  constructor() {
  }

  public getScreeningRoomPlan(screeningRoomId: string): ScreeningRoomPlanApiModel {
    return {
      id: '14sd-47-aaa',
      screeningRoomName: 'Pierwsza',
      rows: this._randomSeats()
    };
  }

  public getBookedSeats(seanceId: string): BookedSeatsApiModel {
    return {
      ids: [
        '12',
        '33',
        '44'
      ]
    };
  }

  private _randomSeats(): ScreeningRoomPlanRowApiModel[] {
    const result = new Array<ScreeningRoomPlanRowApiModel>();

    for (let i = 0; i < 8; i++) {
      const seats = new Array<ScreeningRoomPlanSeatApiModel>();

      for (let j = 0; j < 10; j++) {
        seats.push({
          id: i.toString() + j,
          // isSeat: Math.random() >= 0.5
          isSeat: true
        });
      }

      result.push({
        seats: seats
      });
    }
    return result;
  }
}

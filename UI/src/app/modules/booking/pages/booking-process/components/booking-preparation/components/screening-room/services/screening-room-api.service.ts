import {Injectable} from '@angular/core';
import {ScreeningRoomPlanApiModel} from '../models/api/screening-room-plan-api.model';
import {BookedSeatsApiModel} from '../models/api/booked-seats/booked-seats-api.model';
import {BookingServicesModule} from '../../../../../../../booking-services.module';
import {HttpBaseService} from '../../../../../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: BookingServicesModule
})
export class ScreeningRoomApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getScreeningRoomPlan(screeningRoomId: string): ScreeningRoomPlanApiModel {
  //   return {
  //     id: '14sd-47-aaa',
  //     screeningRoomName: 'Pierwsza',
  //     rows: this._randomSeats()
  //   };
  // }

  // public getBookedSeats(seanceId: string): BookedSeatsApiModel {
  //   return {
  //     ids: [
  //       '12',
  //       '33',
  //       '44'
  //     ]
  //   };
  // }

  public getScreeningRoomPlan(screeningRoomId: string): Observable<ScreeningRoomPlanApiModel> {
    return this._httpService.get<ScreeningRoomPlanApiModel>(`room/getPlan/${screeningRoomId}`);
  }

  public getBookedSeats(seanceId: string): Observable<string[]> {
    return this._httpService.get<string[]>(`reservation/getBySeanceId/${seanceId}`);
  }
}

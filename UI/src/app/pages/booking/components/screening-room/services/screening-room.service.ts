import {Injectable} from '@angular/core';
import {ScreeningRoomPlanApiModel} from '../api-models/screening-room-plan-api.model';
import {BookedSeatsApiModel} from '../../../api-models/booked-seats/booked-seats-api.model';

@Injectable({
  providedIn: 'root'
})
export class ScreeningRoomService {

  constructor() {
  }

  public getScreeningRoomPlan(): ScreeningRoomPlanApiModel {
    return {
      id: 'fajne iddd',
      screeningRoomName: 'Pierwsza',
      rows: [
        {
          seats: [
            {id: '', isSeat: false},
            {id: '12', isSeat: true},
            {id: '13', isSeat: true},
            {id: '', isSeat: false},
            {id: '15', isSeat: true}
          ]
        },
        {
          seats: [
            {id: '21', isSeat: false},
            {id: '22', isSeat: true},
            {id: '23', isSeat: true},
            {id: '', isSeat: false},
            {id: '', isSeat: false},
          ]
        },
        {
          seats: [
            {id: '', isSeat: false},
            {id: '', isSeat: false},
            {id: '', isSeat: false},
            {id: '', isSeat: false},
            {id: '33', isSeat: true}
          ]
        },
        {
          seats: [
            {id: '41', isSeat: true},
            {id: '42', isSeat: true},
            {id: '', isSeat: false},
            {id: '44', isSeat: true}
          ]
        },
      ]
    };
  }

  public getBookedSeats(): BookedSeatsApiModel {
    return {
      ids: [
        '12',
        '33',
        '44'
      ]
    };
  }
}

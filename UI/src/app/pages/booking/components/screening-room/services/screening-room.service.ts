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
          number: 1,
          seats: [
            {id: '', number: 0, isSeat: false},
            {id: '12', number: 1, isSeat: true},
            {id: '13', number: 2, isSeat: true},
            {id: '', number: 0, isSeat: false},
            {id: '15', number: 3, isSeat: true}
          ]
        },
        {
          number: 2,
          seats: [
            {id: '21', number: 0, isSeat: false},
            {id: '22', number: 1, isSeat: true},
            {id: '23', number: 2, isSeat: true},
            {id: '', number: 0, isSeat: false},
            {id: '', number: 0, isSeat: false},
          ]
        },
        {
          number: 3,
          seats: [
            {id: '', number: 0, isSeat: false},
            {id: '', number: 0, isSeat: false},
            {id: '', number: 0, isSeat: false},
            {id: '', number: 0, isSeat: false},
            {id: '33', number: 1, isSeat: true}
          ]
        },
        {
          number: 4,
          seats: [
            {id: '41', number: 1, isSeat: true},
            {id: '42', number: 2, isSeat: true},
            {id: '', number: 0, isSeat: false},
            {id: '44', number: 3, isSeat: true}
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

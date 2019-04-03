import {Injectable} from '@angular/core';
import {SeanceApiModel} from '../api-models/seance-api.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor() {
  }

  public getSeance(id: string): SeanceApiModel {
    console.log('id seansu', id);
    return {
      id: 'seance-good-id',
      screeningRoomId: 'sr-good-id',
      movieTitle: 'Jaś Fasola',
      date: new Date()
    };
  }
}

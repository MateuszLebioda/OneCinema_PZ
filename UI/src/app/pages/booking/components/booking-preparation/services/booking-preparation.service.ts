import {Injectable} from '@angular/core';
import {SeanceApiModel} from '../api-models/seance-api.model';

@Injectable({
  providedIn: 'root'
})
export class BookingPreparationService {

  constructor() {
  }

  public getSeance(id: string): SeanceApiModel {
    return {
      id: 'seance-good-id',
      screeningRoomId: 'sr-good-id',
      movieTitle: 'Jaś Fasola',
      date: new Date(),
      screeningRoomName: 'Super sala',
      seanceType: '3D'
    };
  }
}

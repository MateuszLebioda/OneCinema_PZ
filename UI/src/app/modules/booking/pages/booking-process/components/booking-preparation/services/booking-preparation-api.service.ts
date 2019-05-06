import {Injectable} from '@angular/core';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {BookingServicesModule} from '../../../../../booking-services.module';
import {HttpBaseService} from '../../../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: BookingServicesModule
})
export class BookingPreparationApiService {

  constructor(private _httpService: HttpBaseService) {
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

  public getSeance2(id: string): Observable<SeanceApiModel> {
    return this._httpService.get<SeanceApiModel>('');
  }
}

import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';
import {SeancesRequestModel} from '../models/requests/seances-request.model';
import {ScreeningRoomApiModel} from '../models/api/screening-room-api.model';
import {Observable} from 'rxjs/internal/Observable';
import {HttpBaseService} from '../../../../../../../core/services/http-base.service';

@Injectable({
  providedIn: AdminServicesModule
})
export class SeanceApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getScreeningRooms(): ScreeningRoomApiModel[] {
  //   return [
  //     {
  //       id: 'sfdsfffasdsdfa',
  //       name: 'super sala',
  //       breakBeforeAndAfterMovie: 15
  //     },
  //     {
  //       id: 'wifvicvwibie',
  //       name: 'fajny room',
  //       breakBeforeAndAfterMovie: 10
  //     }
  //   ];
  // }

  // public getMoviesProjections(date: SeancesRequestModel): SeanceApiModel[] {
  //   return [
  //     {
  //       seanceId: 'qwscvfv5',
  //       title: 'Jaś fasola',
  //       projectionType: ProjectionType.type2D,
  //       start: new Date('May 13, 2019 8:05:00'),
  //       finish: new Date('May 13, 2019 10:05:00')
  //     },
  //     {
  //       seanceId: 'wsx2',
  //       title: 'The Avengers',
  //       projectionType: ProjectionType.type2D,
  //       start: new Date('May 13, 2019 10:30:00'),
  //       finish: new Date('May 13, 2019 12:05:00')
  //     },
  //     {
  //       seanceId: 'edc3',
  //       title: 'Wróg u bram',
  //       projectionType: ProjectionType.type2D,
  //       start: new Date('May 13, 2019 13:05:00'),
  //       finish: new Date('May 13, 2019 15:35:00')
  //     },
  //     {
  //       seanceId: 'id1',
  //       title: 'Linia Jordana',
  //       projectionType: ProjectionType.type2D,
  //       start: new Date('May 13, 2019 20:05:00'),
  //       finish: new Date('May 13, 2019 22:35:00')
  //     },
  //   ];
  // }

  public getScreeningRooms(): Observable<ScreeningRoomApiModel[]> {
    return this._httpService.get<ScreeningRoomApiModel[]>('room/getRooms');
  }

  public getMoviesProjections(date: SeancesRequestModel): Observable<SeanceApiModel[]> {
    date.date = new Date(date.date.toUTCString());
    console.log(JSON.stringify(date));
    return this._httpService.post<SeanceApiModel[]>('room/getSeances', date);
  }
}

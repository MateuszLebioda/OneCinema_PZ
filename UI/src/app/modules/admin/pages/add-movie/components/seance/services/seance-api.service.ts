import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {ProjectionType} from '../../../../../../repertoire/enums/projection-type.enum';
import {SeanceRequestModel} from '../models/requests/seance-request.model';
import {SeanceRoomApiModel} from '../models/api/seance-room-api.model';

@Injectable({
  providedIn: AdminServicesModule
})
export class SeanceApiService {

  constructor() {
  }

  public getSeanceRooms(): SeanceRoomApiModel[] {
    return [
      {
        id: 'xxxq',
        name: 'super sala',
        breakBeforeAndAfterSeance: 15
      },
      {
        id: 'wifvicvwibie',
        name: 'fajny room',
        breakBeforeAndAfterSeance: 10
      }
    ];
  }

  public getMoviesProjections(date: SeanceRequestModel): SeanceApiModel[] {
    return [
      {
        title: 'Jaś fasola',
        projectionType: ProjectionType.type2D,
        start: new Date('April 3, 2019 8:05:00'),
        end: new Date('April 3, 2019 10:05:00')
      },
      {
        title: 'The Avengers',
        projectionType: ProjectionType.type2D,
        start: new Date('April 3, 2019 10:30:00'),
        end: new Date('April 3, 2019 12:05:00')
      },
      {
        title: 'Wróg u bram',
        projectionType: ProjectionType.type2D,
        start: new Date('April 3, 2019 13:05:00'),
        end: new Date('April 3, 2019 15:35:00')
      },
      {
        title: 'Linia Jordana',
        projectionType: ProjectionType.type2D,
        start: new Date('April 3, 2019 20:05:00'),
        end: new Date('April 3, 2019 22:35:00')
      },
    ];
  }
}

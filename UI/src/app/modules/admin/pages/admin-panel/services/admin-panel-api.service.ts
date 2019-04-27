import {Injectable} from '@angular/core';
import {MovieApiModel} from '../api-models/movie-api.model';
import {AdminServicesModule} from '../../../admin-services.module';

@Injectable({
  providedIn: AdminServicesModule
})
export class AdminPanelApiService {

  constructor() {
  }

  public getMovies(): MovieApiModel[] {
    return [
      {
        id: 'qp84cw6aq65',
        title: 'Avengers'
      },
      {
        id: 'ddbdj8ac4d',
        title: 'Jaś Fasola'
      }
    ];
  }
}

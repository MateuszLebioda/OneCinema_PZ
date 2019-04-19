import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../../../admin-services.module';
import {MovieProjectionApiModel} from '../api-models/movie-projection-api.model';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProjectionService {

  constructor() {
  }

  public getMoviesMrojections(): MovieProjectionApiModel[] {
    return null;
  }
}

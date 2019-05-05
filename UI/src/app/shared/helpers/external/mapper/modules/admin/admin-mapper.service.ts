import {Injectable} from '@angular/core';
import * as automapper from 'automapper-ts';
import {MovieProcessingScreeningRoomModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-screening-room.model';
import {MovieProcessingSreeningRoomRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-sreening-room-request.model';
import {SharedServicesModule} from 'src/app/shared/shared-services.module';
import {MovieProcessingApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-api.model';
import {MovieProcessingModel} from '../../../../../../modules/admin/pages/movie-processing/models/movie-processing.model';
import {AdminAutomapperMaps} from './admin-automapper-maps';

@Injectable({
  providedIn: SharedServicesModule
})
export class AdminMapperService {

  constructor() {
    AdminAutomapperMaps.InitializeMaps();
    AdminAutomapperMaps.InitializeCustomMaps();
  }

  public toAddMovieSreeningRoomRequestModel(source: MovieProcessingScreeningRoomModel): MovieProcessingSreeningRoomRequestModel {
    const destination: MovieProcessingSreeningRoomRequestModel = automapper.map(MovieProcessingScreeningRoomModel.name, MovieProcessingSreeningRoomRequestModel.name, source);
    return destination;
  }

  public toMovieProcessingModel(source: MovieProcessingApiModel): MovieProcessingModel {
    const destination: MovieProcessingModel = automapper.map(MovieProcessingApiModel.name, MovieProcessingModel.name, source);
    return destination;
  }
}

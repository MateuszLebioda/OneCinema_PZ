import {Injectable} from '@angular/core';
import {MovieProcessingWeekModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-week.model';
import {MovieProcessingWeekRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-week-request.model';
import {MovieProcessingDayRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-day-request.model';
import {MovieProcessingDayModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-day.model';
import {MovieProcessingSeanceTimeModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-seance-time.model';
import {MovieProcessingSeanceTimeRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-seance-time-request.model';
import {MovieProcessingScreeningRoomModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-screening-room.model';
import {MovieProcessingSreeningRoomRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-sreening-room-request.model';
import {SharedServicesModule} from 'src/app/shared/shared-services.module';
import {AutomapperMaps} from '../../automapper-maps';

@Injectable({
  providedIn: SharedServicesModule
})
export class AdminMapperService {

  constructor() {
    AutomapperMaps.InitializeMaps();
  }

  public toAddSeanceWeekRequestModel(source: MovieProcessingWeekModel): MovieProcessingWeekRequestModel {
    const destination: MovieProcessingWeekRequestModel = automapper.map(MovieProcessingWeekModel.name, MovieProcessingWeekRequestModel.name, source);

    return destination;
  }

  public toAddSeanceDayRequestModel(source: MovieProcessingDayModel): MovieProcessingDayRequestModel {
    const destination: MovieProcessingDayRequestModel = automapper.map(MovieProcessingDayModel.name, MovieProcessingDayRequestModel.name, source);

    return destination;
  }

  public toAddSeanceTimeRequestModel(source: MovieProcessingSeanceTimeModel): MovieProcessingSeanceTimeRequestModel {
    const destination: MovieProcessingSeanceTimeRequestModel = automapper.map(MovieProcessingSeanceTimeModel.name, MovieProcessingSeanceTimeRequestModel.name, source);

    return destination;
  }

  public toAddMovieSreeningRoomRequestModel(source: MovieProcessingScreeningRoomModel): MovieProcessingSreeningRoomRequestModel {
    const destination: MovieProcessingSreeningRoomRequestModel = automapper.map(MovieProcessingScreeningRoomModel.name, MovieProcessingSreeningRoomRequestModel.name, source);

    return destination;
  }
}

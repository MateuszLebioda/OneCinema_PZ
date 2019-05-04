import {Injectable} from '@angular/core';
import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../../modules/repertoire/models/api/movie-projection-api.model';
import {MovieProjection} from '../../../../modules/repertoire/models/movie-projection.model';
import {AutomapperMaps} from './automapper-maps';
import {PropertiesMapper} from './properties-mapper';
import {MovieApiModel} from '../../../../modules/movie/models/api/movie-api.model';
import {Movie} from '../../../../modules/movie/models/movie.model';
import {SeancesPerDay} from '../../../../modules/movie/models/seances-per-day.model';
import {DaySeancesApiModel} from '../../../../modules/movie/models/api/day-seances-api.model';
import {ScreeningRoom} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/screening-room';
import {ScreeningRoomPlanApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/api/screening-room-plan-api.model';
import {SharedServicesModule} from '../../../shared-services.module';
import {TranslatorService} from '../../internal/translator.service';
import {SeanceApiModel} from '../../../../modules/admin/pages/movie-processing/components/seance/models/api/seance-api.model';
import {MovieProcessingSeanceTimeModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-seance-time.model';
import {MovieProcessingWeekModel} from '../../../../modules/admin/pages/movie-processing/models/movie-processing-week.model';
import {MovieProcessingRequestModel} from '../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-request.model';
import {MovieProcessingWeekRequestModel} from '../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-week-request.model';
import {MovieProcessingDayRequestModel} from '../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-day-request.model';
import {MovieProcessingDayModel} from '../../../../modules/admin/pages/movie-processing/models/movie-processing-day.model';
import {MovieProcessingSeanceTimeRequestModel} from '../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-seance-time-request.model';
import {MovieProcessingScreeningRoomModel} from '../../../../modules/admin/pages/movie-processing/models/movie-processing-screening-room.model';
import {MovieProcessingSreeningRoomRequestModel} from '../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-sreening-room-request.model';

@Injectable({
  providedIn: SharedServicesModule
})
export class MapperService {

  constructor(private _translator: TranslatorService) {
    AutomapperMaps.InitializeMaps();
  }

  public toMovieProjection(source: MovieProjectionApiModel): MovieProjection {
    const destination: MovieProjection = automapper.map(MovieProjectionApiModel.name, MovieProjection.name, source);
    destination.seances = PropertiesMapper.getSeancesPerTimesOfDay(source.seances);
    destination.movieGenders = [];
    source.movieGenders.forEach(movieGender =>
      destination.movieGenders.push(this._translator.translateMovieGender(movieGender))
    );

    return destination;
  }

  public toMovieProjectionCollection(source: MovieProjectionApiModel[]): MovieProjection[] {
    const destination: MovieProjection[] = [];
    source.forEach((value => destination.push(this.toMovieProjection(value))));
    return destination;
  }

  public toDaySeances(source: DaySeancesApiModel): SeancesPerDay {
    const destination: SeancesPerDay = automapper.map(DaySeancesApiModel.name, SeancesPerDay.name, source);
    destination.seances = PropertiesMapper.getSeancesPerTimesOfDay(source.seances);

    return destination;
  }

  public toScreeningRoom(source: ScreeningRoomPlanApiModel): ScreeningRoom {
    const destination: ScreeningRoom = automapper.map(ScreeningRoomPlanApiModel.name, ScreeningRoom.name, source);
    destination.rows = PropertiesMapper.getRows(source.rows);

    return destination;
  }

  public toSeanceApiModel(source: MovieProcessingSeanceTimeModel): SeanceApiModel {
    const destination: SeanceApiModel = automapper.map(MovieProcessingSeanceTimeModel.name, SeanceApiModel.name, source);

    return destination;
  }
}

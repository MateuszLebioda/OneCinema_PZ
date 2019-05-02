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
import {SeanceApiModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/api/seance-api.model';
import {AddMovieProjectionTimeModel} from 'src/app/modules/admin/pages/add-movie/components/seance/models/add-movie-projection-time.model';
import {AddMovieWeekModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/add-movie-week.model';
import {AddMovieRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-movie-request.model';
import {AddSeanceWeekRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-seance-week-request.model';
import {AddSeanceDayRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-seance-day-request.model';
import {AddMovieDayModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/add-movie-day.model';
import {AddSeanceTimeRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-seance-time-request.model';

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

  public toMovie(source: MovieApiModel): Movie {
    const destination: Movie = automapper.map(MovieApiModel.name, Movie.name, source);
    destination.seances2D.forEach((value, index) => {
      value = this.toDaySeances(source.seances2D[index]);
    });
    destination.seances3D.forEach((value, index) => {
      value = this.toDaySeances(source.seances3D[index]);
    });

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

  public toSeanceApiModel(source: AddMovieProjectionTimeModel): SeanceApiModel {
    const destination: SeanceApiModel = automapper.map(AddMovieProjectionTimeModel.name, SeanceApiModel.name, source);

    return destination;
  }

  public toAddSeanceWeekRequestModel(source: AddMovieWeekModel): AddSeanceWeekRequestModel {
    const destination: AddSeanceWeekRequestModel = automapper.map(AddMovieWeekModel.name, AddSeanceWeekRequestModel.name, source);

    return destination;
  }

  public toAddSeanceDayRequestModel(source: AddMovieDayModel): AddSeanceDayRequestModel {
    const destination: AddSeanceDayRequestModel = automapper.map(AddMovieDayModel.name, AddSeanceDayRequestModel.name, source);

    return destination;
  }

  public toAddSeanceTimeRequestModel(source: AddMovieProjectionTimeModel): AddSeanceTimeRequestModel {
    const destination: AddSeanceTimeRequestModel = automapper.map(AddMovieProjectionTimeModel.name, AddSeanceTimeRequestModel.name, source);

    return destination;
  }
}

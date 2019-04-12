import {Injectable} from '@angular/core';
import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../modules/repertoire/api-models/movie-projection-api.model';
import {MovieProjection} from '../../../modules/repertoire/models/movie-projection.model';
import {AutomapperMaps} from './automapper-maps';
import {PropertiesMapper} from './properties-mapper';
import {MovieApiModel} from '../../../modules/movie/api-models/movie-api.model';
import {Movie} from '../../../modules/movie/models/movie.model';
import {SeancesPerDay} from '../../../modules/movie/models/seances-per-day.model';
import {DaySeancesApiModel} from '../../../modules/movie/api-models/day-seances-api.model';
import {Seat} from '../../../modules/booking/pages/booking-process/components/booking-preparation/models/seat';
import {ScreeningRoomPlanRowApiModel} from '../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/api-models/screening-room-plan-row-api.model';
import {ScreeningRoom} from '../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/screening-room';
import {ScreeningRoomPlanApiModel} from '../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/api-models/screening-room-plan-api.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() {
    AutomapperMaps.InitializeMaps();
  }

  public toMovieProjection(source: MovieProjectionApiModel): MovieProjection {
    const destination: MovieProjection = automapper.map(MovieProjectionApiModel.name, MovieProjection.name, source);
    destination.seances = PropertiesMapper.getSeancesPerTimesOfDay(source.seances);
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
}

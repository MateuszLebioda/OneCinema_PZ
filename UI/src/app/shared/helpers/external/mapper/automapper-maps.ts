import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../../modules/repertoire/api-models/movie-projection-api.model';
import {MovieProjection} from '../../../../modules/repertoire/models/movie-projection.model';
import {DaySeancesApiModel} from '../../../../modules/movie/api-models/day-seances-api.model';
import {SeancesPerDay} from '../../../../modules/movie/models/seances-per-day.model';
import {MovieApiModel} from '../../../../modules/movie/api-models/movie-api.model';
import {Movie} from '../../../../modules/movie/models/movie.model';
import {ScreeningRoomPlanApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/api-models/screening-room-plan-api.model';
import {ScreeningRoom} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/screening-room';

export class AutomapperMaps {
  public static InitializeMaps(): void {
    automapper.createMap(MovieProjectionApiModel.name, MovieProjection.name)
      .forSourceMember('seances', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });

    automapper.createMap(DaySeancesApiModel.name, SeancesPerDay.name)
      .forSourceMember('seances', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });

    automapper.createMap(MovieApiModel.name, Movie.name)
      .forSourceMember('seances2D', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      })
      .forSourceMember('seances3D', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });

    automapper.createMap(ScreeningRoomPlanApiModel.name, ScreeningRoom.name)
      .forSourceMember('rows', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });
  }
}

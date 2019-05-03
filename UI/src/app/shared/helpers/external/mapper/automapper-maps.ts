import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../../modules/repertoire/models/api/movie-projection-api.model';
import {MovieProjection} from '../../../../modules/repertoire/models/movie-projection.model';
import {DaySeancesApiModel} from '../../../../modules/movie/models/api/day-seances-api.model';
import {SeancesPerDay} from '../../../../modules/movie/models/seances-per-day.model';
import {MovieApiModel} from '../../../../modules/movie/models/api/movie-api.model';
import {Movie} from '../../../../modules/movie/models/movie.model';
import {ScreeningRoomPlanApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/api/screening-room-plan-api.model';
import {ScreeningRoom} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/screening-room';
import {SeanceApiModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/api/seance-api.model';
import { AddMovieProjectionTimeModel } from 'src/app/modules/admin/pages/add-movie/components/seance/models/add-movie-projection-time.model';
import {AddMovieWeekModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/add-movie-week.model';
import {AddSeanceWeekRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-seance-week-request.model';
import {AddMovieDayModel} from '../../../../modules/admin/pages/add-movie/components/seance/models/add-movie-day.model';
import {AddSeanceDayRequestModel} from '../../../../modules/admin/pages/add-movie/models/requests/add-seance-day-request.model';

export class AutomapperMaps {
  public static InitializeMaps(): void {
    automapper.createMap(MovieProjectionApiModel.name, MovieProjection.name)
      .forSourceMember('screeningRooms', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      })
      .forSourceMember('movieGenders', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });

    automapper.createMap(DaySeancesApiModel.name, SeancesPerDay.name)
      .forSourceMember('screeningRooms', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
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

    automapper.createMap(AddMovieProjectionTimeModel.name, SeanceApiModel.name);
    automapper.createMap(AddMovieWeekModel.name, AddSeanceWeekRequestModel.name);
    automapper.createMap(AddMovieDayModel.name, AddSeanceDayRequestModel.name);
  }
}

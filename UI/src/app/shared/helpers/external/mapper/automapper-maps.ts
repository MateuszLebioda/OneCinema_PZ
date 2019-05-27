import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../../modules/repertoire/models/api/movie-projection-api.model';
import {MovieProjection} from '../../../../modules/repertoire/models/movie-projection.model';
import {DaySeancesApiModel} from '../../../../modules/movie/models/api/day-seances-api.model';
import {SeancesPerDay} from '../../../../modules/movie/models/seances-per-day.model';
import {MovieApiModel} from '../../../../modules/movie/models/api/movie-api.model';
import {Movie} from '../../../../modules/movie/models/movie.model';
import {ScreeningRoomPlanApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/api/screening-room-plan-api.model';
import {ScreeningRoom} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/screening-room';
import {PropertiesMapper} from './properties-mapper';

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
      .forMember('seances2D', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as DaySeancesApiModel[];
        return this.toSeancesPerDayCollection(source);
      })
      .forMember('seances3D', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as DaySeancesApiModel[];
        return this.toSeancesPerDayCollection(source);
      });

    automapper.createMap(ScreeningRoomPlanApiModel.name, ScreeningRoom.name)
      .forSourceMember('rows', (opts: AutoMapperJs.ISourceMemberConfigurationOptions) => {
        opts.ignore();
      });
  }

  private static toSeancesPerDayCollection(source: DaySeancesApiModel[]): SeancesPerDay[] {
    const destination: SeancesPerDay[] = [];
    console.log('toSeancesPerDayCollection', source);
    source.forEach(s => {
      const dest = automapper.map(DaySeancesApiModel.name, SeancesPerDay.name, s);
      dest.seances = PropertiesMapper.getSeancesPerTimesOfDay(s.seances);

      destination.push(dest);
    });

    return destination;
  }
}

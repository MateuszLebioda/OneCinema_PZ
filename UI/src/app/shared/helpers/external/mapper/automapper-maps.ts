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
import {ScreeningRoomPlanRowApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/api/screening-room-plan-row-api.model';
import {Seat} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/models/seat';
import {Lodash} from '../lodash';
import {SeatStatus} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/enums/seat-status';

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
      .forMember('rows', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as ScreeningRoomPlanRowApiModel[];

        const rowsCount = source.length;
        const seatsCount = source[0].seats.length;

        Lodash.utils.sortBy(source, 'row');
        source.forEach(s => {
          Lodash.utils.sortBy(s.seats, 'number');
        });

        const destination: Array<Array<Seat>> = new Array<Array<Seat>>();

        for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
          destination.push(new Array<Seat>());

          for (let seatIndex = 0; seatIndex < seatsCount; seatIndex++) {
            destination[rowIndex].push(new Seat());

            destination[rowIndex][seatIndex].id = source[rowIndex].seats[seatIndex].id;
            destination[rowIndex][seatIndex].row = source[rowIndex].row;
            destination[rowIndex][seatIndex].number = source[rowIndex].seats[seatIndex].number;
            destination[rowIndex][seatIndex].status =
              source[rowIndex].seats[seatIndex].seat ? SeatStatus.available : SeatStatus.unavailable;

          }
        }


        return destination;
      });
  }

  private static toSeancesPerDayCollection(source: DaySeancesApiModel[]): SeancesPerDay[] {
    const destination: SeancesPerDay[] = [];
    source.forEach(s => {
      const dest = automapper.map(DaySeancesApiModel.name, SeancesPerDay.name, s);
      dest.seances = PropertiesMapper.getSeancesPerTimesOfDay(s.seances);

      destination.push(dest);
    });

    return destination;
  }
}

import * as automapper from 'automapper-ts';
import {MovieProcessingSeanceTimeModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-seance-time.model';
import {MovieProcessingWeekRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-week-request.model';
import {MovieProcessingDayRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-day-request.model';
import {MovieProcessingSreeningRoomRequestModel} from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-sreening-room-request.model';
import {MovieProcessingWeekModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-week.model';
import {MovieProcessingDayModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-day.model';
import {MovieProcessingScreeningRoomModel} from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-screening-room.model';
import {MovieProcessingScreeningRoomApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-screening-room-api.model';
import {MovieProcessingWeekApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-week-api.model';
import {MovieProcessingDayApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-day-api.model';
import {MovieProcessingSeanceTimeApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-seance-time-api.model';
import {MovieProcessingApiModel} from '../../../../../../modules/admin/pages/movie-processing/models/api/movie-processing-api.model';
import {MovieProcessingModel} from '../../../../../../modules/admin/pages/movie-processing/models/movie-processing.model';
import {SeanceApiModel} from '../../../../../../modules/admin/pages/movie-processing/components/seance/models/api/seance-api.model';
import {MovieProcessingRequestModel} from '../../../../../../modules/admin/pages/movie-processing/models/requests/movie-processing-request.model';

export class AdminAutomapperMaps {
  public static InitializeMaps(): void {
    automapper.createMap(MovieProcessingModel.name, MovieProcessingRequestModel.name);
    automapper.createMap(MovieProcessingScreeningRoomModel.name, MovieProcessingSreeningRoomRequestModel.name);
    automapper.createMap(MovieProcessingWeekModel.name, MovieProcessingWeekRequestModel.name);
    automapper.createMap(MovieProcessingDayModel.name, MovieProcessingDayRequestModel.name);
    automapper.createMap(MovieProcessingSeanceTimeModel.name, SeanceApiModel.name);

    automapper.createMap(MovieProcessingDayApiModel.name, MovieProcessingDayModel.name);
    automapper.createMap(MovieProcessingSeanceTimeApiModel.name, MovieProcessingSeanceTimeModel.name);
  }

  public static InitializeCustomMaps(): void {
    automapper.createMap(MovieProcessingWeekApiModel.name, MovieProcessingWeekModel.name)
      .forMember('days', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as MovieProcessingDayApiModel[];
        const destination = new MovieProcessingWeekModel();

        for (let i = 0; i < 7; i++) {
          const sourceDayIndex = source.findIndex(sDay => sDay.day === destination.days[i].day);
          if (sourceDayIndex >= 0) {
            const sourceDay = source[sourceDayIndex];
            destination.days[i] = automapper.map(MovieProcessingDayApiModel.name, MovieProcessingDayModel.name, sourceDay);
          }
        }

        return destination.days;
      });

    automapper.createMap(MovieProcessingScreeningRoomApiModel.name, MovieProcessingScreeningRoomModel.name)
      .forMember('weeks', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as MovieProcessingWeekApiModel[];
        const destination: MovieProcessingWeekModel[] = [];

        let maxWeekNumber = 0;
        source.forEach(w => w.weekNumber > maxWeekNumber ? maxWeekNumber = w.weekNumber : null);

        for (let weekNumber = 0; weekNumber <= maxWeekNumber; weekNumber++) {
          destination.push(new MovieProcessingWeekModel());

          destination[weekNumber].weekNumber = weekNumber;
          const sourceWeekIndex = source.findIndex(sWeek => sWeek.weekNumber === weekNumber);

          if (sourceWeekIndex >= 0) {
            destination[weekNumber] = automapper.map(MovieProcessingWeekApiModel.name, MovieProcessingWeekModel.name, source[sourceWeekIndex]);
          }
        }

        return destination;
      });

    automapper.createMap(MovieProcessingApiModel.name, MovieProcessingModel.name)
      .forMember('screeningRooms', (opts: AutoMapperJs.IMemberConfigurationOptions) => {
        const source = opts.sourceObject[opts.sourcePropertyName] as MovieProcessingScreeningRoomApiModel[];
        const destination: MovieProcessingScreeningRoomModel[] = [];

        source.forEach(s => {
          destination.push(
            automapper.map(MovieProcessingScreeningRoomApiModel.name, MovieProcessingScreeningRoomModel.name, s)
          );
        });

        return destination;
      });
  }
}

import { SeanceApiModel } from './../../../../../../modules/repertoire/models/api/seance-api.model';
import * as automapper from 'automapper-ts';
import { MovieProcessingSeanceTimeModel } from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-seance-time.model';
import { MovieProcessingWeekRequestModel } from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-week-request.model';
import { MovieProcessingDayRequestModel } from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-day-request.model';
import { MovieProcessingSreeningRoomRequestModel } from 'src/app/modules/admin/pages/movie-processing/models/requests/movie-processing-sreening-room-request.model';
import { MovieProcessingWeekModel } from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-week.model';
import { MovieProcessingDayModel } from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-day.model';
import { MovieProcessingScreeningRoomModel } from 'src/app/modules/admin/pages/movie-processing/models/movie-processing-screening-room.model';

export class AutomapperMaps {
  public static InitializeMaps(): void {
    automapper.createMap(MovieProcessingSeanceTimeModel.name, SeanceApiModel.name);
    automapper.createMap(MovieProcessingWeekModel.name, MovieProcessingWeekRequestModel.name);
    automapper.createMap(MovieProcessingDayModel.name, MovieProcessingDayRequestModel.name);
    automapper.createMap(MovieProcessingScreeningRoomModel.name, MovieProcessingSreeningRoomRequestModel.name);
  }
}

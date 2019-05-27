import {SeanceApiModel} from '../../../../modules/repertoire/models/api/seance-api.model';
import {SeancesPerTimesOfDay} from '../../../../modules/repertoire/models/seances-per-times-of-day';
import {Seat} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/models/seat';
import {ScreeningRoomPlanRowApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/models/api/screening-room-plan-row-api.model';
import {SeatStatus} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/enums/seat-status';
import {DateTime} from 'luxon';
import {Luxon} from '../luxon';

export class PropertiesMapper {

  public static getSeancesPerTimesOfDay(source: SeanceApiModel[]): SeancesPerTimesOfDay {
    const destination: SeancesPerTimesOfDay = new SeancesPerTimesOfDay();

    for (const seance of source) {
      console.log(seance.start);
      console.log('nowa', JSON.stringify(new Date(new Date().toUTCString())));
      console.log('UTC', new Date().toUTCString());
      console.log('UTC', new Date().toUTCString());
      console.log('UTC po formacie', new Date(new Date().toUTCString()));
      console.log('ss', seance.start.toString());
      console.log(Luxon.utils.DateTime.fromISO(seance.start.toString()));
      seance.start = new Date(seance.start);
      seance.finish = new Date(seance.finish);

      const untilNoon = new Date(seance.start);
      untilNoon.setHours(12);
      untilNoon.setMinutes(0);
      untilNoon.setMilliseconds(0);

      const evening = new Date(untilNoon);
      untilNoon.setHours(18);

      if (seance.start <= untilNoon) {
        destination.seancesUntilNoon.push(seance);
      } else if (seance.start <= evening) {
        destination.seancesAfternoon.push(seance);
      } else {
        destination.seancesEvening.push(seance);
      }
    }
    return destination;
  }

  public static getRows(rows: ScreeningRoomPlanRowApiModel[]): Array<Array<Seat>> {
    const result = new Array<Array<Seat>>();

    rows.forEach((row, rowIndex) => {
      result.push(new Array<Seat>());
      let seatNumber = 1;
      row.seats.forEach((seat, seatIndex) => {
        result[rowIndex].push(new Seat());
        result[rowIndex][seatIndex].id = seat.id;
        result[rowIndex][seatIndex].row = seat.isSeat ? rowIndex + 1 : 0;
        result[rowIndex][seatIndex].number = seat.isSeat ? seatNumber++ : 0;
        result[rowIndex][seatIndex].status = seat.isSeat ? SeatStatus.available : SeatStatus.unavailable;
      });
    });

    return result;
  }
}

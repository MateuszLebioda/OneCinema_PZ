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
    console.log('LECI!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', source);
    for (const seance of source) {
      console.log('polecialo', seance);
      seance.start = new Date(seance.start);
      seance.finish = new Date(seance.finish);

      const untilNoon = new Date(seance.start);
      untilNoon.setHours(12);
      untilNoon.setMinutes(0);
      untilNoon.setMilliseconds(0);

      const afterNoon = new Date(untilNoon);
      afterNoon.setHours(18);

      if (seance.start <= untilNoon) {
        destination.seancesUntilNoon.push(seance);
      } else if (seance.start <= afterNoon) {
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
        result[rowIndex][seatIndex].row = seat.seat ? rowIndex + 1 : 0;
        result[rowIndex][seatIndex].number = seat.seat ? seatNumber++ : 0;
        result[rowIndex][seatIndex].status = seat.seat ? SeatStatus.available : SeatStatus.unavailable;
      });
    });

    return result;
  }
}

import {SeanceApiModel} from '../../../pages/repertoire/api-models/seance-api.model';
import {SeancesPerTimesOfDay} from '../../../pages/repertoire/models/seances-per-times-of-day';
import {Seat} from '../../../pages/booking/models/seat';
import {ScreeningRoomPlanRowApiModel} from '../../../pages/booking/components/screening-room/api-models/screening-room-plan-row-api.model';
import {SeatStatus} from '../../../pages/booking/enums/seat-status';

export class PropertiesMapper {

  public static getSeancesPerTimesOfDay(source: SeanceApiModel[]): SeancesPerTimesOfDay {
    const destination: SeancesPerTimesOfDay = new SeancesPerTimesOfDay();

    for (const seance of source) {
      const minutesInDay = seance.start.getMinutes() + seance.start.getHours() * 60;

      if (minutesInDay <= 12 * 60) {
        destination.seancesUntilNoon.push(seance);
      } else if (minutesInDay <= 18 * 60) {
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
        result[rowIndex][seatIndex].number = seat.isSeat ? seatNumber++ : 0;
        result[rowIndex][seatIndex].status = seat.isSeat ? SeatStatus.available : SeatStatus.unavailable;
      });
    });

    return result;
  }
}

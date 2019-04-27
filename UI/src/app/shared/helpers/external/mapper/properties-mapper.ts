import {SeanceApiModel} from '../../../../modules/repertoire/models/api-models/seance-api.model';
import {SeancesPerTimesOfDay} from '../../../../modules/repertoire/models/seances-per-times-of-day';
import {Seat} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/models/seat';
import {ScreeningRoomPlanRowApiModel} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/components/screening-room/api-models/screening-room-plan-row-api.model';
import {SeatStatus} from '../../../../modules/booking/pages/booking-process/components/booking-preparation/enums/seat-status';

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
        result[rowIndex][seatIndex].row = seat.isSeat ? rowIndex + 1 : 0;
        result[rowIndex][seatIndex].number = seat.isSeat ? seatNumber++ : 0;
        result[rowIndex][seatIndex].status = seat.isSeat ? SeatStatus.available : SeatStatus.unavailable;
      });
    });

    return result;
  }
}

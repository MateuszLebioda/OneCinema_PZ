import {Seat} from '../../../models/seat';
import {SeatStatus} from '../../../enums/seat-status';

export class ScreeningRoomOne {
  public rows: Array<Array<Seat>> = new Array<Array<Seat>>(8);

  private _seatNumber = 0;

  constructor() {
    for (let _i = 0; _i < 2; _i++) {
      const row = new Array<Seat>(10);
      this.eightSeatsInRow(row);
      this.rows[_i] = row;
    }

    for (let _i = 2; _i < 10; _i++) {
      const row = new Array<Seat>(10);
      this.tenSeatsInRow(row);
      this.rows[_i] = row;
    }
  }

  private eightSeatsInRow(row: Array<Seat>): void {
    row[0] = new Seat();
    row[0].status = SeatStatus.unavailable;

    row[9] = new Seat();
    row[9].status = SeatStatus.unavailable;

    for (let _i = 1; _i < row.length - 1; _i++) {
      row[_i] = new Seat();
      row[_i].number = ++this._seatNumber;
      row[_i].status = SeatStatus.available;
    }
  }

  private tenSeatsInRow(row: Array<Seat>): void {
    for (let _i = 0; _i < row.length; _i++) {
      row[_i] = new Seat();
      row[_i].number = ++this._seatNumber;
      row[_i].status = SeatStatus.available;
    }
  }
}

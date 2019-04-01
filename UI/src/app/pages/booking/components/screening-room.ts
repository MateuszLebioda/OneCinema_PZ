import {Seat} from '../models/seat';
import {SeatStatus} from '../enums/seat-status';

export abstract class ScreeningRoom {
  public rows: Array<Array<Seat>>;
  private _seatNumber = 0;

  constructor(rowsCount: number) {
    this.rows = new Array<Array<Seat>>(rowsCount);
  }


  public sixSeatsInRow(row: Array<Seat>): void {
    row[0] = new Seat();
    row[0].status = SeatStatus.unavailable;
    row[1] = new Seat();
    row[1].status = SeatStatus.unavailable;

    row[8] = new Seat();
    row[8].status = SeatStatus.unavailable;
    row[9] = new Seat();
    row[9].status = SeatStatus.unavailable;

    for (let _i = 2; _i < row.length - 2; _i++) {
      row[_i] = new Seat();
      row[_i].number = ++this._seatNumber;
      row[_i].status = SeatStatus.available;
    }
  }

  public eightSeatsInRow(row: Array<Seat>): void {
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

  public tenSeatsInRow(row: Array<Seat>): void {
    for (let _i = 0; _i < row.length; _i++) {
      row[_i] = new Seat();
      row[_i].number = ++this._seatNumber;
      row[_i].status = SeatStatus.available;
    }
  }
}

import {Seat} from '../../../models/seat';
import {ScreeningRoom} from '../../screening-room';

export class ScreeningRoomOne extends ScreeningRoom {
  constructor() {
    super(8);

    for (let _i = 0; _i < 2; _i++) {
      const row = new Array<Seat>(10);
      this.eightSeatsInRow(row);
      this.rows[_i] = row;
    }

    for (let _i = 2; _i < 8; _i++) {
      const row = new Array<Seat>(10);
      this.tenSeatsInRow(row);
      this.rows[_i] = row;
    }
  }
}

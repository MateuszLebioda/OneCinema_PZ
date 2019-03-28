import {SeatStatus} from '../enums/seat-status';

export class Seat {
  public number: number;
  public status: SeatStatus;
  public selected: boolean;

  constructor() {
    this.status = SeatStatus.available;
  }
}

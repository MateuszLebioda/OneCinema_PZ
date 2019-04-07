import {SeatStatus} from '../enums/seat-status';

export class Seat {
  public id: string;
  public row: number;
  public number: number;
  public status: SeatStatus;
  public selected: boolean;

  constructor() {
    this.status = SeatStatus.available;
  }
}

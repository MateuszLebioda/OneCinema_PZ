import {Seat} from '../../../models/seat';

export class ScreeningRoom {
  public id: string;
  public screeningRoomName: string;
  public rows: Array<Array<Seat>>;
}

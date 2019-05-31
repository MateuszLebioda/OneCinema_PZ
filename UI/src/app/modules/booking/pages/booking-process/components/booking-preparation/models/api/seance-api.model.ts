import {ProjectionType} from '../../../../../../../movie/enums/projection-type.enum';

export class SeanceApiModel {
  public seanceId: string;
  public screeningRoomId: string;
  public screeningRoomName: string;
  public movieTitle: string;
  public date: Date;
  public seanceType: ProjectionType;

  constructor() {
    this.date = new Date();
  }
}

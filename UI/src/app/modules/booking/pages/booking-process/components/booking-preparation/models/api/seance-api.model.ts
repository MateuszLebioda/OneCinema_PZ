export class SeanceApiModel {
  public id: string;
  public screeningRoomId: string;
  public screeningRoomName: string;
  public movieTitle: string;
  public date: Date;
  public seanceType: string;

  constructor() {
    this.date = new Date();
  }
}

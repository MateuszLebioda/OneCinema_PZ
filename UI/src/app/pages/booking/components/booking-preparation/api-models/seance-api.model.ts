export class SeanceApiModel {
  public id: string;
  public screeningRoomId: string;
  public screeningRoomName: string;
  public movieTitle: string;
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}

export class SeancesRequestModel {
  public screeningRoomId: string;
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}

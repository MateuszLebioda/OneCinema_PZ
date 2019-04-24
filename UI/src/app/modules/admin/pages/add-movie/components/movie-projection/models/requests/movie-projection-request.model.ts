export class MovieProjectionRequestModel {
  public seanceRoomId: string;
  public date: Date;

  constructor() {
    this.date = new Date();
  }
}

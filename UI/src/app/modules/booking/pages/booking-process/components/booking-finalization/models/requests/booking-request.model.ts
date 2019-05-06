import {BookedSeatApiModel} from '../api/booked-seat-api.model';

export class BookingRequestModel {
  public seanceId: string;
  public clientFirstname: string;
  public clientSurname: string;
  public clientEmail: string;
  public bookedSeats: BookedSeatApiModel[];

  constructor() {
    this.bookedSeats = [];
  }
}

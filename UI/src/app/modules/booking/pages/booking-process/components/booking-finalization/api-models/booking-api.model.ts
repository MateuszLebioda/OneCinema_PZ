import {BookedSeatApiModel} from './booked-seat-api.model';

export class BookingApiModel {
  public seanceId: string;
  public clientFirstname: string;
  public clientSurname: string;
  public clientEmail: string;
  public bookedSeats: BookedSeatApiModel[];

  constructor() {
    this.bookedSeats = [];
  }
}

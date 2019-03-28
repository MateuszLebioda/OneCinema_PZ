import {Component, OnInit} from '@angular/core';
import {Seat} from './models/seat';

@Component({
  selector: 'app-reservation',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public bookedSeats: Array<Seat> = new Array<Seat>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public setBookedSeats(bookedSeats: Array<Seat>): void {
    this.bookedSeats = bookedSeats;
  }
}

import {Component, OnInit} from '@angular/core';
import {Seat} from './models/seat';
import {BookingService} from './services/booking.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public bookedSeats: Array<Seat> = new Array<Seat>();

  constructor(private _bookingService: BookingService) {
  }

  public ngOnInit(): void {
  }

  public setBookedSeats(bookedSeats: Array<Seat>): void {
    this.bookedSeats = bookedSeats;
  }

  public bookSeats(): void {
    console.log('zabukowano');
  }
}

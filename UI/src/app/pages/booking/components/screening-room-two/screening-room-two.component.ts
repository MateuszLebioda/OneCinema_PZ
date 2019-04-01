import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Seat} from '../../models/seat';
import {ScreeningRoomOne} from '../screening-room-one/models/screening-room-one';
import {SeatStatus} from '../../enums/seat-status';
import {ScreeningRoomTwo} from './models/screening-room-two';

@Component({
  selector: 'app-screening-room-two',
  templateUrl: './screening-room-two.component.html',
  styleUrls: ['./screening-room-two.component.css', '../../booking.component.css']
})
export class ScreeningRoomTwoComponent implements OnInit {
  @Output() bookedSeatsEvent: EventEmitter<Array<Seat>> = new EventEmitter();

  public screeningRoom: ScreeningRoomOne = new ScreeningRoomTwo();

  private readonly maxBookedSeats: number = 4;
  private bookedSeats: Array<Seat> = new Array<Seat>();

  constructor() {
  }

  public ngOnInit(): void {
  }

  public bookSeat(seat: Seat): void {
    if (seat.status === SeatStatus.available) {
      if (this.bookedSeats.includes(seat)) {
        console.log('Usunieto');
        this.bookedSeats.splice(this.bookedSeats.indexOf(seat), 1);
        seat.selected = false;
      } else if (this.bookedSeats.length === this.maxBookedSeats) {
        console.log('ZA DUŻO');
      } else {
        console.log('Dodano');
        seat.selected = true;
        this.bookedSeats.push(seat);
      }
    }
    this.bookedSeatsEvent.emit(this.bookedSeats);
  }
}

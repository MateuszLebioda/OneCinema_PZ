import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Seat} from '../../models/seat';
import {SeatStatus} from '../../enums/seat-status';
import {ScreeningRoomService} from './services/screening-room.service';
import {MapperService} from '../../../../shared/helpers/mapper/mapper.service';
import {ScreeningRoom} from './models/screening-room';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.css', '../../booking.component.css']
})
export class ScreeningRoomComponent implements OnInit {
  @Output() bookedSeatsEvent: EventEmitter<Array<Seat>> = new EventEmitter();
  public screeningRoom: ScreeningRoom = new ScreeningRoom();

  private readonly _maxBookedSeats: number = 4;
  private _bookedSeats: Array<Seat> = new Array<Seat>();
  private _alreadyBookedSeats: string[] = [];

  constructor(private _screeningRoomService: ScreeningRoomService, private _mapper: MapperService) {
  }

  public ngOnInit(): void {
    const screeningRoomPlan = this._screeningRoomService.getScreeningRoomPlan();
    this.screeningRoom = this._mapper.toScreeningRoom(screeningRoomPlan);

    setInterval(() => {
      const _alreadyBookedSeatsForThisMoment = this._screeningRoomService.getBookedSeats().ids;
      if (!this._isArraysEqual(_alreadyBookedSeatsForThisMoment, this._alreadyBookedSeats)) {
        this._alreadyBookedSeats = Object.assign([], this._alreadyBookedSeats);
        this._setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(this._alreadyBookedSeats);
      }
    }, 1000 * 15);
  }

  public bookSeat(seat: Seat): void {
    if (seat.status === SeatStatus.available) {
      if (this._bookedSeats.includes(seat)) {
        console.log('Usunieto');
        this._bookedSeats.splice(this._bookedSeats.indexOf(seat), 1);
        seat.selected = false;
      } else if (this._bookedSeats.length === this._maxBookedSeats) {
        console.log('ZA DUŻO');
      } else {
        console.log('Dodano');
        seat.selected = true;
        this._bookedSeats.push(seat);
      }
    }
    this.bookedSeatsEvent.emit(this._bookedSeats);
  }

  private _setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(alreadyBookedSeats: string[]): void {
    alreadyBookedSeats.forEach(id => {
      this.screeningRoom.rows.forEach(row => {
        row.forEach(seat => {
          if (seat.id === id) {
            const alreadyBookedSeatIndex = this._bookedSeats.findIndex(oneSeat => oneSeat.id === id);
            this._bookedSeats.splice(alreadyBookedSeatIndex, 1);
            seat.selected = false;
            seat.status = SeatStatus.booked;
          }
        });
      });
    });
  }

  private _isArraysEqual(first: string[], second: string[]): boolean {
    return first.every(element => second.includes(element));
  }
}

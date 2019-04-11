import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from '../../models/seat';
import {SeatStatus} from '../../enums/seat-status';
import {ScreeningRoomService} from './services/screening-room.service';
import {MapperService} from '../../../../../../shared/helpers/mapper/mapper.service';
import {ScreeningRoom} from './models/screening-room';
import {SeanceApiModel} from '../../api-models/seance-api.model';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.css', '../../../../booking.component.css']
})
export class ScreeningRoomComponent implements OnInit {
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Input() bookedSeats: Seat[] = [];
  @Output() bookedSeatsChange: EventEmitter<Seat[]> = new EventEmitter<Seat[]>();

  public screeningRoom: ScreeningRoom = new ScreeningRoom();

  private readonly _maxBookedSeats: number = 4;
  private _alreadyBookedSeats: string[] = [];

  constructor(private _screeningRoomService: ScreeningRoomService, private _mapper: MapperService) {
  }

  public ngOnInit(): void {
    const screeningRoomPlan = this._screeningRoomService.getScreeningRoomPlan(this.seance.screeningRoomId);
    this.screeningRoom = this._mapper.toScreeningRoom(screeningRoomPlan);
    this._setScreeningRoomPlane();
    this._setBookedSeats();

    setInterval(() => {
      this._setScreeningRoomPlane();
    }, 1000 * 5);
  }

  public bookSeat(seat: Seat): void {
    if (seat.status === SeatStatus.available) {
      if (this.bookedSeats.includes(seat)) {
        this.bookedSeats.splice(this.bookedSeats.indexOf(seat), 1);
        seat.selected = false;
      } else if (this.bookedSeats.length === this._maxBookedSeats) {
      } else {
        seat.selected = true;
        this.bookedSeats.push(seat);
      }
    }
    this.bookedSeatsChange.emit(this.bookedSeats);
  }

  private _setScreeningRoomPlane(): void {
    const _alreadyBookedSeatsForThisMoment = this._screeningRoomService.getBookedSeats(this.seance.id).ids;
    if (!this._areArraysEqual(_alreadyBookedSeatsForThisMoment, this._alreadyBookedSeats)) {
      this._alreadyBookedSeats = Object.assign([], _alreadyBookedSeatsForThisMoment);
      this._setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(this._alreadyBookedSeats);
    }
  }

  private _setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(alreadyBookedSeats: string[]): void {
    alreadyBookedSeats.forEach(id => {
      this.screeningRoom.rows.forEach(row => {
        row.forEach(seat => {
          if (seat.id === id) {
            const alreadyBookedSeatIndex = this.bookedSeats.findIndex(oneSeat => oneSeat.id === id);
            if (alreadyBookedSeatIndex >= 0) {
              this.bookedSeats.splice(alreadyBookedSeatIndex, 1);
            }
            seat.selected = false;
            seat.status = SeatStatus.booked;
          }
        });
      });
    });
  }

  private _areArraysEqual(firstArray: string[], secondArray: string[]): boolean {
    return firstArray.every(element => {
      return secondArray.includes(element);
    });
  }

  private _setBookedSeats(): void {
    this.screeningRoom.rows.forEach(row => {
      row.forEach(seat => {
        const bookedSeatIndex = this.bookedSeats.findIndex(oneSeat => oneSeat.id === seat.id);
        if (bookedSeatIndex >= 0) {
          seat.selected = true;
        }
      });
    });
  }
}

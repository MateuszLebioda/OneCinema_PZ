import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from '../../models/seat';
import {SeatStatus} from '../../enums/seat-status';
import {ScreeningRoomService} from './services/screening-room.service';
import {MapperService} from '../../../../shared/helpers/mapper/mapper.service';
import {ScreeningRoom} from './models/screening-room';
import {SeanceApiModel} from '../../api-models/seance-api.model';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.css', '../../booking.component.css']
})
export class ScreeningRoomComponent implements OnInit {
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Output() bookedSeatsEvent: EventEmitter<Array<Seat>> = new EventEmitter();
  public screeningRoom: ScreeningRoom = new ScreeningRoom();

  private readonly _maxBookedSeats: number = 4;
  private _bookedSeats: Array<Seat> = new Array<Seat>();
  private _alreadyBookedSeats: string[] = [];

  constructor(private _screeningRoomService: ScreeningRoomService, private _mapper: MapperService) {
  }

  public ngOnInit(): void {
    const screeningRoomPlan = this._screeningRoomService.getScreeningRoomPlan(this.seance.screeningRoomId);
    this.screeningRoom = this._mapper.toScreeningRoom(screeningRoomPlan);
    this._setScreeningRoomPlane();

    setInterval(() => {
      this._setScreeningRoomPlane();
    }, 1000 * 5);
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

  private _setScreeningRoomPlane(): void {
    const _alreadyBookedSeatsForThisMoment = this._screeningRoomService.getBookedSeats(this.seance.id).ids;
    if (!this._isArraysEqual(_alreadyBookedSeatsForThisMoment, this._alreadyBookedSeats)) {
      console.log('Zajęte miejsca się zmieniły');
      this._alreadyBookedSeats = Object.assign([], _alreadyBookedSeatsForThisMoment);
      this._setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(this._alreadyBookedSeats);
    }
    console.log('Sprawdzono zajete miejsca');
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

  private _isArraysEqual(firstArray: string[], secondArray: string[]): boolean {
    console.log('pierwsza', firstArray);
    console.log('druga', secondArray);
    return firstArray.every(element => {
      console.log(secondArray.includes(element));
      return secondArray.includes(element);
    });
  }
}

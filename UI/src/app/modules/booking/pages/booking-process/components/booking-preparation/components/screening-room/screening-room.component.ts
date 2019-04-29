import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from '../../models/seat';
import {ScreeningRoom} from './models/screening-room';
import {SeanceApiModel} from '../../models/api/seance-api.model';
import {ScreeningRoomService} from './services/screening-room.service';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.css', '../../../../booking-process.component.css']
})
export class ScreeningRoomComponent implements OnInit {
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Input() bookedSeats: Seat[] = [];
  @Output() bookedSeatsChange: EventEmitter<Seat[]> = new EventEmitter<Seat[]>();

  public screeningRoom: ScreeningRoom = new ScreeningRoom();

  private _alreadyBookedSeats: string[] = [];

  constructor(private _screeningRoomService: ScreeningRoomService) {
  }

  ngOnInit() {
    this.screeningRoom = this._screeningRoomService.getScreeningRoom(this.seance.screeningRoomId);
    this._setScreeningRoomPlane();
    this._screeningRoomService.setBookedSeats(this.screeningRoom, this.bookedSeats);

    setInterval(() => {
      this._setScreeningRoomPlane();
    }, 1000 * 5);
  }

  public bookSeat(seat: Seat): void {
    this.bookedSeats = this._screeningRoomService.addBookedSeat(seat, this.bookedSeats);
    this.bookedSeatsChange.emit(this.bookedSeats);
  }

  private _setScreeningRoomPlane(): void {
    const _alreadyBookedSeatsForThisMoment = this._screeningRoomService.getAlreadyBookedSeatsForThisMoment(this.seance.id);
    if (!this._screeningRoomService.areArraysEqual(_alreadyBookedSeatsForThisMoment, this._alreadyBookedSeats)) {
      this._alreadyBookedSeats = Object.assign([], _alreadyBookedSeatsForThisMoment);
      this._screeningRoomService.setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(
        this.screeningRoom, _alreadyBookedSeatsForThisMoment, this.bookedSeats);
    }
  }
}

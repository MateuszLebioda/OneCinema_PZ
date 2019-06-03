import {Component, EventEmitter, Input, OnInit, Output, OnDestroy} from '@angular/core';
import {Seat} from '../../models/seat';
import {ScreeningRoom} from './models/screening-room';
import {SeanceApiModel} from '../../models/api/seance-api.model';
import {ScreeningRoomService} from './services/screening-room.service';
import {NotificationService} from '../../../../../../../../core/services/notification.service';
import {ScreeningRoomApiService} from './services/screening-room-api.service';
import {MapperService} from '../../../../../../../../shared/helpers/external/mapper/mapper.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-screening-room',
  templateUrl: './screening-room.component.html',
  styleUrls: ['./screening-room.component.css', '../../../../booking-process.component.css']
})
export class ScreeningRoomComponent implements OnInit, OnDestroy {
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Input() bookedSeats: Seat[] = [];
  @Output() bookedSeatsChange: EventEmitter<Seat[]> = new EventEmitter<Seat[]>();

  public screeningRoom: ScreeningRoom = new ScreeningRoom();

  private _alreadyBookedSeats: string[] = [];
  private _myInterval: number;

  constructor(
    private _screeningRoomService: ScreeningRoomService,
    private _screeningRoomApiService: ScreeningRoomApiService,
    private _mapper: MapperService,
    private route: ActivatedRoute,
    private _notificationService: NotificationService) {
  }

  ngOnInit() {
    this._screeningRoomApiService.getScreeningRoomPlan(this.seance.screeningRoomId).subscribe(p => {
      this.screeningRoom = this._mapper.toScreeningRoom(p);

      this._setScreeningRoomPlane();
      this._screeningRoomService.setBookedSeats(this.screeningRoom, this.bookedSeats);

      this._myInterval = setInterval(() => {
        this._setScreeningRoomPlane();
      }, 1000 * 5);
    });
  }

  ngOnDestroy() {
    clearInterval(this._myInterval);
  }

  public bookSeat(seat: Seat): void {
    this.bookedSeats = this._screeningRoomService.addBookedSeat(seat, this.bookedSeats);
    this.bookedSeatsChange.emit(this.bookedSeats);
  }

  private _setScreeningRoomPlane(): void {
    this._screeningRoomApiService.getBookedSeats(this.seance.seanceId).subscribe(alreadyBookedSeats => {
      if (!this._screeningRoomService.areArraysEqual(alreadyBookedSeats, this._alreadyBookedSeats)) {
        this._alreadyBookedSeats = Object.assign([], alreadyBookedSeats);
        const removedSeat = this._screeningRoomService.setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(
          this.screeningRoom, alreadyBookedSeats, this.bookedSeats);

        if (removedSeat) {
          this._notificationService.showError('Wybrane przez ciebie miejsce zostało już zarezerwowane przez inną osobę więc zostało usunięte z listy wybranych przez ciebie miejsc');
        }
      }
    });
  }
}

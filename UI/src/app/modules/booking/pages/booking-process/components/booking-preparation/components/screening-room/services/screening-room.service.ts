import {Injectable} from '@angular/core';
import {Seat} from '../../../models/seat';
import {SeatStatus} from '../../../enums/seat-status';
import {ScreeningRoomApiService} from './screening-room-api.service';
import {MapperService} from '../../../../../../../../../shared/helpers/external/mapper/mapper.service';
import {ScreeningRoom} from '../models/screening-room';

@Injectable({
  providedIn: 'root'
})
export class ScreeningRoomService {
  private readonly _maxBookedSeats: number = 4;

  constructor(
    private _screeningRoomService: ScreeningRoomService,
    private _screeningRoomApiService: ScreeningRoomApiService,
    private _mapper: MapperService) {
  }


  public addBookedSeat(seat: Seat, bookedSeats: Seat[]): Seat[] {
    if (seat.status === SeatStatus.available) {
      const bookedSeatIndex = bookedSeats.findIndex(s => s.id === seat.id);

      if (bookedSeatIndex >= 0) {
        bookedSeats.splice(bookedSeatIndex, 1);
        seat.selected = false;
      } else if (bookedSeats.length === this._maxBookedSeats) {
      } else {
        seat.selected = true;
        bookedSeats.push(seat);
      }
    }

    return bookedSeats;
  }

  public setAlreadyBookedSeatsOnPlaneAndRemoveThemFromBookedSeatsCollection(screeningRoom: ScreeningRoom,
                                                                            alreadyBookedSeats: string[],
                                                                            bookedSeats: Seat[]): boolean {
    let removedSeat = false;
    screeningRoom.rows.forEach(row => {
      row.forEach(seat => {
        if (alreadyBookedSeats.includes(seat.id)) {
          const alreadyBookedSeatIndex = bookedSeats.findIndex(
            alreadyBookedSeatSeat => alreadyBookedSeatSeat.id === seat.id);
          if (alreadyBookedSeatIndex >= 0) {
            removedSeat = true;
            bookedSeats.splice(alreadyBookedSeatIndex, 1);
          }
          seat.selected = false;
          seat.status = SeatStatus.booked;
        }
      });
    });

    return removedSeat;
  }

  public areArraysEqual(firstArray: string[], secondArray: string[]): boolean {
    return firstArray.every(element => {
      return secondArray.includes(element);
    });
  }

  public setBookedSeats(screeningRoom: ScreeningRoom, bookedSeats: Seat[]): void {
    screeningRoom.rows.forEach(row => {
      row.forEach(seat => {
        const bookedSeatIndex = bookedSeats.findIndex(oneSeat => oneSeat.id === seat.id);
        if (bookedSeatIndex >= 0) {
          seat.selected = true;
        }
      });
    });
  }
}

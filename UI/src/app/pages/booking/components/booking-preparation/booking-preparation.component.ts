import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Seat} from './models/seat';
import {SeanceApiModel} from './api-models/seance-api.model';
import {BookingPreparationService} from './services/booking-preparation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking-preparation',
  templateUrl: './booking-preparation.component.html',
  styleUrls: ['./booking-preparation.component.css', '../../booking.component.css']
})
export class BookingPreparationComponent implements OnInit {
  @Output() bookedSeatsEvent: EventEmitter<Array<Seat>> = new EventEmitter<Array<Seat>>();
  public bookedSeats: Array<Seat> = new Array<Seat>();
  public seance: SeanceApiModel = new SeanceApiModel();

  constructor(private _bookingService: BookingPreparationService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    this.seance = this._bookingService.getSeance(seanceId);
  }

  public setBookedSeats(bookedSeats: Array<Seat>): void {
    this.bookedSeats = bookedSeats;
  }

  public bookSeats(): void {
    this.bookedSeatsEvent.emit(this.bookedSeats);
  }
}

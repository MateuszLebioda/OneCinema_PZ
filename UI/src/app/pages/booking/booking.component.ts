import {Component, OnInit} from '@angular/core';
import {Seat} from './models/seat';
import {BookingService} from './services/booking.service';
import {ActivatedRoute} from '@angular/router';
import {SeanceApiModel} from './api-models/seance-api.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public bookedSeats: Array<Seat> = new Array<Seat>();
  public seance: SeanceApiModel = new SeanceApiModel();

  constructor(private _bookingService: BookingService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    this.seance = this._bookingService.getSeance(seanceId);
  }

  public setBookedSeats(bookedSeats: Array<Seat>): void {
    this.bookedSeats = bookedSeats;
  }

  public bookSeats(): void {
    console.log('zabukowano');
  }
}

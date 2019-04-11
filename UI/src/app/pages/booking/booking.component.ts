import {Component, OnInit} from '@angular/core';
import {Seat} from './components/booking-preparation/models/seat';
import {BookingPreparationService} from './components/booking-preparation/services/booking-preparation.service';
import {ActivatedRoute} from '@angular/router';
import {SeanceApiModel} from './components/booking-preparation/api-models/seance-api.model';

@Component({
  selector: 'app-reservation',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  public preparation = true;
  public bookedSeats: Seat[] = [];
  public seance: SeanceApiModel = new SeanceApiModel();

  constructor(private _bookingService: BookingPreparationService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    this.seance = this._bookingService.getSeance(seanceId);
  }

  public startFinalization(): void {
    this.preparation = false;
  }

  public startPreparation(): void {
    this.preparation = true;
  }
}

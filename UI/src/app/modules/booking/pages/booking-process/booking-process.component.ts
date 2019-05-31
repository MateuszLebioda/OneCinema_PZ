import {Component, OnInit} from '@angular/core';
import {Seat} from './components/booking-preparation/models/seat';
import {SeanceApiModel} from './components/booking-preparation/models/api/seance-api.model';
import {BookingPreparationApiService} from './components/booking-preparation/services/booking-preparation-api.service';
import {ActivatedRoute} from '@angular/router';
import {ProjectionType} from '../../../movie/enums/projection-type.enum';

@Component({
  selector: 'app-booking-process',
  templateUrl: './booking-process.component.html',
  styleUrls: ['./booking-process.component.css']
})
export class BookingProcessComponent implements OnInit {
  public preparation = true;
  public bookedSeats: Seat[] = [];
  public seance: SeanceApiModel = new SeanceApiModel();

  constructor(private _bookingService: BookingPreparationApiService, private _route: ActivatedRoute) {
  }

  ngOnInit() {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    this._bookingService.getSeance(seanceId).subscribe(s => {
      this.seance = s;
      this.seance.date = new Date(s.date);
      this.seance.seanceType = s.seanceType === '3D' ? ProjectionType.type3D : ProjectionType.type2D;
    });
  }

  public startFinalization(): void {
    this.preparation = false;
  }

  public startPreparation(): void {
    this.preparation = true;
  }
}

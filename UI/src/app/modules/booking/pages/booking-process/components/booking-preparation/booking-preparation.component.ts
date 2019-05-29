import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeanceApiModel} from './models/api/seance-api.model';
import {BookingPreparationApiService} from './services/booking-preparation-api.service';
import {ActivatedRoute} from '@angular/router';
import {Seat} from './models/seat';

@Component({
  selector: 'app-booking-preparation',
  templateUrl: './booking-preparation.component.html',
  styleUrls: ['./booking-preparation.component.css', '../../booking-process.component.css']
})
export class BookingPreparationComponent implements OnInit {
  @Input() bookedSeats: Seat[] = [];
  @Output() bookedSeatsChange: EventEmitter<Seat[]> = new EventEmitter<Seat[]>();
  @Output() finishedPreparation: EventEmitter<void> = new EventEmitter<void>();

  public seance: SeanceApiModel = new SeanceApiModel();
  public seanceIsDownloaded = false;

  constructor(
    private _bookingService: BookingPreparationApiService,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    console.log('BookingPreparationComponent-seanceId', seanceId);
    this._bookingService.getSeance(seanceId).subscribe(s => {
      console.log('BookingPreparationComponent-seance', s);
      this.seance = s;
      this.seanceIsDownloaded = true;
    });
  }

  public bookSeats(): void {
    this.finishedPreparation.emit();
  }
}

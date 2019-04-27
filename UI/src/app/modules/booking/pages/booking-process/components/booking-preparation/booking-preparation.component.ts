import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SeanceApiModel} from './models/api-models/seance-api.model';
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

  constructor(private _bookingService: BookingPreparationApiService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    const seanceId: string = this._route.snapshot.params['seanceId'];
    this.seance = this._bookingService.getSeance(seanceId);
  }

  public bookSeats(): void {
    this.finishedPreparation.emit();
  }
}

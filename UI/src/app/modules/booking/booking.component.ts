import {Component, OnInit} from '@angular/core';
import {BookingPreparationApiService} from './pages/booking-process/components/booking-preparation/services/booking-preparation-api.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(
    private _bookingService: BookingPreparationApiService,
    private _route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}

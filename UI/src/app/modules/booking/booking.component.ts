import {Component, OnInit} from '@angular/core';
import {BookingPreparationService} from './pages/booking-process/components/booking-preparation/services/booking-preparation.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  constructor(private _bookingService: BookingPreparationService, private _route: ActivatedRoute) {
  }

  public ngOnInit(): void {
  }
}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from '../booking-preparation/models/seat';
import {SeanceApiModel} from '../booking-preparation/models/api/seance-api.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BookingFinalizationService} from './services/booking-finalization.service';
import {TicketPrice} from './models/ticket-price';

@Component({
  selector: 'app-booking-finalization',
  templateUrl: './booking-finalization.component.html',
  styleUrls: ['./booking-finalization.component.css', '../../booking-process.component.css']
})
export class BookingFinalizationComponent implements OnInit {
  @Input() bookedSeats: Seat[] = [];
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Output() backToPreparationEvent: EventEmitter<void> = new EventEmitter<void>();

  public get price(): number {
    let price = 0;
    this.bookedSeats.forEach(seat => {
      if (seat.reducedPrice) {
        price += this._ticketPrice.reduced;
      } else {
        price += this._ticketPrice.normal;
      }
    });

    return price;
  }

  public get formControls() {
    return this.bookingForm.controls;
  }

  public bookingForm: FormGroup;

  private _ticketPrice: TicketPrice = new TicketPrice();

  constructor(
    private _bookingFinalizationService: BookingFinalizationService,
    private _router: Router) {
  }

  ngOnInit() {
    this.bookingForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(35)]),
      'surname': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

    this._ticketPrice = this._bookingFinalizationService.getTicketPrices(this.seance);
  }

  public isInvalid(formControlName: string): boolean {
    return this._bookingFinalizationService.isInvalid(this.bookingForm, formControlName);
  }

  public onSubmit(): void {
    this._bookingFinalizationService.bookSeats(this.seance, this.bookingForm, this.bookedSeats);
    this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public setReducedPrice(seat: Seat): void {
    seat.reducedPrice = !seat.reducedPrice;
  }

  public backToPreparation(): void {
    this._bookingFinalizationService.resetBookedSeats(this.bookedSeats);
    this.backToPreparationEvent.emit();
  }
}

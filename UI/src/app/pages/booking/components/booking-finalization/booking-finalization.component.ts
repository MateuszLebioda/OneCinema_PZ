import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Seat} from '../booking-preparation/models/seat';
import {SeanceApiModel} from '../booking-preparation/api-models/seance-api.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {GeneralFormControlName} from '../../../../shared/enums/general-form-control-name.enum';
import {NavbarService} from '../../../../shared/components/navbar/services/navbar.service';
import {BookingFinalizationService} from './services/booking-finalization.service';
import {PriceListApiModel} from '../../../../shared/components/navbar/api-models/price-list-api.model';
import {BookingApiModel} from './api-models/booking-api.model';
import {isNull} from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-booking-finalization',
  templateUrl: './booking-finalization.component.html',
  styleUrls: ['./booking-finalization.component.css', '../../booking.component.css']
})
export class BookingFinalizationComponent implements OnInit {
  @Input() bookedSeats: Seat[] = [];
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  @Output() backToPreparationEvent: EventEmitter<void> = new EventEmitter<void>();

  public get price(): number {
    let price = 0;

    this.bookedSeats.forEach(seat => {
      if (seat.reducedPrice) {
        price += this._reducedPrice;
      } else {
        price += this._normalPrice;
      }
    });

    return price;
  }

  public get formControls() {
    return this.bookingForm.controls;
  }

  public bookingForm: FormGroup;
  public GeneralFormControlName = GeneralFormControlName;

  private _prices: PriceListApiModel = new PriceListApiModel();
  private _normalPrice = 0;
  private _reducedPrice = 0;

  constructor(
    public formValidatorService: FormValidatorService,
    private _bookingFinalizationService: BookingFinalizationService) {
  }

  public ngOnInit(): void {
    this.bookingForm = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(35)]),
      'surname': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

    this._prices = this._bookingFinalizationService.getPriceList();
    this._setPrices();
  }

  public isInvalid(formControlName: GeneralFormControlName): boolean {
    return this.formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }

  public onSubmit(): void {
    const bookingApiModel = this._createBookingApiModel(this.bookedSeats, this.seance, this.bookingForm);
    console.log(bookingApiModel);
  }

  public setReducedPrice(seat: Seat): void {
    seat.reducedPrice = !seat.reducedPrice;
  }

  public backToPreparation(): void {
    this.bookedSeats.forEach(seat => {
      seat.reducedPrice = false;
    });
    this.backToPreparationEvent.emit();
  }

  private _setPrices(): void {
    if (this.seance.seanceType === '2D') {
      if (this.seance.date.getDay() >= 1 && this.seance.date.getDay() <= 4) {
        this._normalPrice = this._prices.price2D.normal.mondayThursday;
        this._reducedPrice = this._prices.price2D.reduced.mondayThursday;
      } else {
        this._normalPrice = this._prices.price2D.normal.fridaySunday;
        this._reducedPrice = this._prices.price2D.reduced.fridaySunday;
      }
    } else {
      if (this.seance.date.getDay() >= 1 && this.seance.date.getDay() <= 4) {
        this._normalPrice = this._prices.price3D.normal.mondayThursday;
        this._reducedPrice = this._prices.price3D.reduced.mondayThursday;
      } else {
        this._normalPrice = this._prices.price3D.normal.fridaySunday;
        this._reducedPrice = this._prices.price3D.reduced.fridaySunday;
      }
    }
  }

  private _createBookingApiModel(bookedSeats: Seat[], seance: SeanceApiModel, form: FormGroup): BookingApiModel {
    const bookingApiModel = new BookingApiModel();

    bookingApiModel.seanceId = seance.id;
    bookingApiModel.clientFirstname = form.get('firstname').value;
    bookingApiModel.clientSurname = form.get('surname').value;
    bookingApiModel.clientEmail = form.get('email').value;
    bookedSeats.forEach(seat => bookingApiModel.bookedSeats.push({
      id: seat.id,
      reducedPrice: seat.reducedPrice
    }));

    return bookingApiModel;
  }
}

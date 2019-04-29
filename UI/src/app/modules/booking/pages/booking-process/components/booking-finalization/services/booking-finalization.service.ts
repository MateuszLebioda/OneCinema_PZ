import {Injectable} from '@angular/core';
import {BookingServicesModule} from '../../../../../booking-services.module';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../../../shared/services/form-validator.service';
import {BookingFinalizationApiService} from './booking-finalization-api.service';
import {Seat} from '../../booking-preparation/models/seat';
import {SeanceApiModel} from '../../booking-preparation/models/api/seance-api.model';
import {BookingApiModel} from '../models/api/booking-api.model';
import {TicketPrice} from '../models/ticket-price';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';

@Injectable({
  providedIn: BookingServicesModule
})
export class BookingFinalizationService {
  constructor(
    public formValidatorService: FormValidatorService,
    private _BookingFinalizationService: BookingFinalizationService,
    private _bookingFinalizationApiService: BookingFinalizationApiService) {
  }

  public initForm(): FormGroup {
    const result: FormGroup = new FormGroup({
      'firstname': new FormControl(null, [Validators.required, Validators.maxLength(35)]),
      'surname': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });

    return result;
  }

  public isInvalid(form: FormGroup, formControlName: string): boolean {
    return this.formValidatorService.isInvalidAndTouched(form, formControlName);
  }

  public bookSeats(seance: SeanceApiModel, form: FormGroup, bookedSeats: Seat[]): void {
    const bookingApiModel = this._createBookingApiModel(bookedSeats, seance, form);
    this._bookingFinalizationApiService.bookSeats(bookingApiModel);
  }

  public resetBookedSeats(bookedSeats: Seat[]): void {
    bookedSeats.forEach(seat => {
      seat.reducedPrice = false;
    });
  }

  public getTicketPrices(seance: SeanceApiModel): TicketPrice {
    const prices = this._bookingFinalizationApiService.getPriceList();
    const result = new TicketPrice();
    if (seance.seanceType === ProjectionType.type2D) {
      if (seance.date.getDay() >= 1 && seance.date.getDay() <= 4) {
        result.normal = prices.price2D.normal.mondayThursday;
        result.reduced = prices.price2D.reduced.mondayThursday;
      } else {
        result.normal = prices.price2D.normal.fridaySunday;
        result.reduced = prices.price2D.reduced.fridaySunday;
      }
    } else {
      if (seance.date.getDay() >= 1 && seance.date.getDay() <= 4) {
        result.normal = prices.price3D.normal.mondayThursday;
        result.reduced = prices.price3D.reduced.mondayThursday;
      } else {
        result.normal = prices.price3D.normal.fridaySunday;
        result.reduced = prices.price3D.reduced.fridaySunday;
      }
    }

    return result;
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

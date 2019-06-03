import {Injectable} from '@angular/core';
import {BookingServicesModule} from '../../../../../booking-services.module';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../../../../shared/services/form-validator.service';
import {BookingFinalizationApiService} from './booking-finalization-api.service';
import {Seat} from '../../booking-preparation/models/seat';
import {SeanceApiModel} from '../../booking-preparation/models/api/seance-api.model';
import {BookingRequestModel} from '../models/requests/booking-request.model';
import {TicketPrice} from '../models/ticket-price';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';
import {PriceListApiModel} from '../../../../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';

@Injectable({
  providedIn: BookingServicesModule
})
export class BookingFinalizationService {
  constructor(
    public formValidatorService: FormValidatorService,
    private _apiService: BookingFinalizationApiService) {
  }

  public isInvalid(form: FormGroup, formControlName: string): boolean {
    return this.formValidatorService.isInvalidAndTouched(form, formControlName);
  }

  public bookSeats(seance: SeanceApiModel, form: FormGroup, bookedSeats: Seat[]): void {
    const bookingApiModel = this._createBookingRequest(bookedSeats, seance, form);
    this._apiService.bookSeats(bookingApiModel).subscribe();
  }

  public resetBookedSeats(bookedSeats: Seat[]): void {
    bookedSeats.forEach(seat => {
      seat.reducedPrice = false;
    });
  }

  public getTicketPrices(prices: PriceListApiModel, seance: SeanceApiModel): TicketPrice {
    // let prices: PriceListApiModel;
    // this._apiService.getPriceList().subscribe(priceList => {
    //   prices = priceList;
    // });
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

  private _createBookingRequest(bookedSeats: Seat[], seance: SeanceApiModel, form: FormGroup): BookingRequestModel {
    const bookingApiModel = new BookingRequestModel();
    bookingApiModel.seanceId = seance.seanceId;
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

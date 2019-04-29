import {Injectable} from '@angular/core';
import {PriceListApiModel} from '../../../../../../../shared/components/navbar/models/api-models/price-list-api.model';
import {BookingApiModel} from '../models/api/booking-api.model';
import {BookingServicesModule} from '../../../../../booking-services.module';

@Injectable({
  providedIn: BookingServicesModule
})
export class BookingFinalizationApiService {

  constructor() {
  }

  public getPriceList(): PriceListApiModel {
    return {
      price2D: {
        normal: {
          mondayThursday: 13,
          fridaySunday: 14
        },
        reduced: {
          mondayThursday: 11,
          fridaySunday: 12
        }
      },
      price3D: {
        normal: {
          mondayThursday: 15,
          fridaySunday: 20
        },
        reduced: {
          mondayThursday: 14,
          fridaySunday: 18
        }
      }
    };
  }

  public bookSeats(bookingApiModel: BookingApiModel): void {
    console.log('wysłano rezerwację biletów');
  }
}

import {Injectable} from '@angular/core';
import {PriceListApiModel} from '../../../../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';
import {BookingRequestModel} from '../models/requests/booking-request.model';
import {BookingServicesModule} from '../../../../../booking-services.module';
import {HttpBaseService} from '../../../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: BookingServicesModule
})
export class BookingFinalizationApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getPriceList(): PriceListApiModel {
  //   return {
  //     price2D: {
  //       normal: {
  //         mondayThursday: 13,
  //         fridaySunday: 14
  //       },
  //       reduced: {
  //         mondayThursday: 11,
  //         fridaySunday: 12
  //       }
  //     },
  //     price3D: {
  //       normal: {
  //         mondayThursday: 15,
  //         fridaySunday: 20
  //       },
  //       reduced: {
  //         mondayThursday: 14,
  //         fridaySunday: 18
  //       }
  //     }
  //   };
  // }

  public bookSeats(bookingApiModel: BookingRequestModel): Observable<any> {
    return this._httpService.post<any>('', bookingApiModel);
  }

  public getPriceList(): Observable<PriceListApiModel> {
    return this._httpService.get<PriceListApiModel>('get');
  }
}

import {Injectable} from '@angular/core';
import {PriceListApiModel} from '../../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';
import {AdminServicesModule} from '../../../admin-services.module';
import {EditPriceListRequestModel} from '../models/requests/edit-price-list-request.model';
import {HttpBaseService} from '../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: AdminServicesModule
})
export class EditPriceListApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getPriceList(): PriceListApiModel {
  //   return {
  //     price2D: {
  //       normal: {
  //         mondayThursday: 11,
  //         fridaySunday: 12
  //       },
  //       reduced: {
  //         mondayThursday: 13,
  //         fridaySunday: 14
  //       }
  //     },
  //     price3D: {
  //       normal: {
  //         mondayThursday: 15,
  //         fridaySunday: 16
  //       },
  //       reduced: {
  //         mondayThursday: 17,
  //         fridaySunday: 18
  //       }
  //     }
  //   };
  // }

  public editPriceList(request: EditPriceListRequestModel): void {
    console.log('updated price list');
  }

  public getPriceList(): Observable<PriceListApiModel> {
    return this._httpService.get<PriceListApiModel>('price');
  }

  public editPriceList2(request: EditPriceListRequestModel): Observable<any> {
    return this._httpService.post<any>('', request);
  }
}

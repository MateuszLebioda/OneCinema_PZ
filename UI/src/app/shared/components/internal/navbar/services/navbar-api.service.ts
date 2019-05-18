import {Injectable} from '@angular/core';
import {SharedServicesModule} from '../../../../shared-services.module';
import {HttpBaseService} from '../../../../../core/services/http-base.service';
import {Observable} from 'rxjs';
import {PriceListApiModel} from '../models/api-models/price-list-api.model';

@Injectable({
  providedIn: SharedServicesModule
})
export class NavbarApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  public getPriceList(): Observable<PriceListApiModel> {
    return this._httpService.get<PriceListApiModel>('get');
  }
}

import {Injectable} from '@angular/core';
import {PriceListApiModel} from '../api-models/price-list-api.model';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor() {
  }

  public getPriceList(): PriceListApiModel {
    return {
      price2D: {
        normal: {
          mondayThursday: 11,
          fridaySunday: 12
        },
        reduced: {
          mondayThursday: 13,
          fridaySunday: 14
        }
      },
      price3D: {
        normal: {
          mondayThursday: 15,
          fridaySunday: 16
        },
        reduced: {
          mondayThursday: 17,
          fridaySunday: 18
        }
      }
    };
  }
}

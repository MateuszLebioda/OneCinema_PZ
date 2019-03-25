import {PriceApiModel} from './price-api.model';

export class PriceListApiModel {
  public price2D: PriceApiModel;
  public price3D: PriceApiModel;

  constructor() {
    this.price2D = new PriceApiModel();
    this.price3D = new PriceApiModel();
  }
}

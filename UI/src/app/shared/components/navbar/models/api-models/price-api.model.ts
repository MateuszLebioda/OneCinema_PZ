import {PricePerDayApiModel} from './price-per-day-api.model';

export class PriceApiModel {
  public normal: PricePerDayApiModel;
  public reduced: PricePerDayApiModel;

  constructor() {
    this.normal = new PricePerDayApiModel();
    this.reduced = new PricePerDayApiModel();
  }
}

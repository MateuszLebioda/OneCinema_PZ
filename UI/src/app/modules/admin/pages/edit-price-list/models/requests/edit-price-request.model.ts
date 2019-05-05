import {EditPricePerDayRequestModel} from './edit-price-per-day-request.model';

export class EditPriceRequestModel {
  public normal: EditPricePerDayRequestModel;
  public reduced: EditPricePerDayRequestModel;

  constructor() {
    this.normal = new EditPricePerDayRequestModel();
    this.reduced = new EditPricePerDayRequestModel();
  }
}

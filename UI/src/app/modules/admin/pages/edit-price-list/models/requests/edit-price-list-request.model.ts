import {EditPriceRequestModel} from './edit-price-request.model';

export class EditPriceListRequestModel {
  public price2D: EditPriceRequestModel;
  public price3D: EditPriceRequestModel;

  constructor() {
    this.price2D = new EditPriceRequestModel();
    this.price3D = new EditPriceRequestModel();
  }
}

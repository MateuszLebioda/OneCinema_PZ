import {Component, Input} from '@angular/core';
import {PriceListApiModel} from '../../../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';

@Component({
  selector: 'app-current-price-list',
  templateUrl: './current-price-list.component.html',
  styleUrls: ['./current-price-list.component.css', '../../edit-price-list.component.css']
})
export class CurrentPriceListComponent {
  @Input() priceList: PriceListApiModel = new PriceListApiModel();
}

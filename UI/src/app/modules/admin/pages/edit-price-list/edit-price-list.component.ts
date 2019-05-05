import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {EditPriceListApiService} from './services/edit-price-list-api.service';
import {PriceListApiModel} from '../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';
import {EditPriceListRequestModel} from './models/requests/edit-price-list-request.model';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrls: ['./edit-price-list.component.css', '../../admin.component.css']
})
export class EditPriceListComponent implements OnInit {
  public priceList: PriceListApiModel = new PriceListApiModel();

  constructor(
    private _formValidatorService: FormValidatorService,
    private _apiService: EditPriceListApiService) {
  }

  public ngOnInit(): void {
    this.priceList = this._apiService.getPriceList();
  }

  public editPriceList(form: FormGroup): void {
    const request: EditPriceListRequestModel = {
      price2D: {
        normal: {
          mondayThursday: form.get('normal2DMondayThursday').value,
          fridaySunday: form.get('normal2DFridaySunday').value
        },
        reduced: {
          mondayThursday: form.get('reduced2DMondayThursday').value,
          fridaySunday: form.get('reduced2DFridaySunday').value
        }
      },
      price3D: {
        normal: {
          mondayThursday: form.get('normal3DMondayThursday').value,
          fridaySunday: form.get('normal3DFridaySunday').value
        },
        reduced: {
          mondayThursday: form.get('reduced3DMondayThursday').value,
          fridaySunday: form.get('reduced3DFridaySunday').value
        }
      }
    };

    this._apiService.editPriceList(request);
  }
}

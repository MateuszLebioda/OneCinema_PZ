import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {EditPriceListApiService} from './services/edit-price-list-api.service';
import {PriceListApiModel} from '../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';

@Component({
  selector: 'app-edit-price-list',
  templateUrl: './edit-price-list.component.html',
  styleUrls: ['./edit-price-list.component.css', '../../admin.component.css']
})
export class EditPriceListComponent implements OnInit {
  public get formControls() {
    return this.bookingForm.controls;
  }

  public bookingForm: FormGroup;
  public priceList: PriceListApiModel = new PriceListApiModel();

  constructor(
    private _formValidatorService: FormValidatorService,
    private _editPriceListApiService: EditPriceListApiService) {
  }

  public ngOnInit(): void {
    this.priceList = this._editPriceListApiService.getPriceList();
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }
}

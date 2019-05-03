import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../../../shared/services/form-validator.service';
import {PriceListApiModel} from '../../../../../../shared/components/internal/navbar/models/api-models/price-list-api.model';

@Component({
  selector: 'app-target-price-list',
  templateUrl: './target-price-list.component.html',
  styleUrls: ['./target-price-list.component.css', '../../edit-price-list.component.css']
})
export class TargetPriceListComponent implements OnInit {
  @Input() priceList: PriceListApiModel = new PriceListApiModel();

  public form: FormGroup;

  constructor(private _formValidatorService: FormValidatorService) {
  }

  ngOnInit() {
    this.form = this._initForm(this.priceList);
  }

  private _initForm(priceList: PriceListApiModel): FormGroup {
    return new FormGroup({
      'normal2DMondayThursday': new FormControl(priceList.price2D.normal.mondayThursday, [Validators.required, Validators.min(0)]),
      'normal2DFridaySunday': new FormControl(priceList.price2D.normal.fridaySunday, [Validators.required, Validators.min(0)]),
      'reduced2DMondayThursday': new FormControl(priceList.price2D.reduced.mondayThursday, [Validators.required, Validators.min(0)]),
      'reduced2DFridaySunday': new FormControl(priceList.price2D.reduced.fridaySunday, [Validators.required, Validators.min(0)]),
      'normal3DMondayThursday': new FormControl(priceList.price3D.normal.mondayThursday, [Validators.required, Validators.min(0)]),
      'normal3DFridaySunday': new FormControl(priceList.price3D.normal.fridaySunday, [Validators.required, Validators.min(0)]),
      'reduced3DMondayThursday': new FormControl(priceList.price3D.reduced.mondayThursday, [Validators.required, Validators.min(0)]),
      'reduced3DFridaySunday': new FormControl(priceList.price3D.reduced.fridaySunday, [Validators.required, Validators.min(0)]),
    });
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.form, formControlName);
  }

  public getControl(name: string): AbstractControl {
    return this.form.get(name);
  }

  public isFormValid(): boolean {
    return this.form.valid;
  }

  public onSubmit(): void {
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }
}

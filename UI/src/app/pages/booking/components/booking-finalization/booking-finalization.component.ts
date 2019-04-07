import {Component, Input, OnInit} from '@angular/core';
import {Seat} from '../booking-preparation/models/seat';
import {SeanceApiModel} from '../booking-preparation/api-models/seance-api.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {GeneralFormControlName} from '../../../../shared/enums/general-form-control-name.enum';

@Component({
  selector: 'app-booking-finalization',
  templateUrl: './booking-finalization.component.html',
  styleUrls: ['./booking-finalization.component.css', '../../booking.component.css']
})
export class BookingFinalizationComponent implements OnInit {
  @Input() bookedSeats: Array<Seat> = new Array<Seat>();
  @Input() seance: SeanceApiModel = new SeanceApiModel();
  public bookingForm: FormGroup;
  public GeneralFormControlName = GeneralFormControlName;

  public get price(): number {
    let price = 0;

    this.bookedSeats.forEach(seat => {
      if (seat.halfPriceTicket) {
        price += 10;
      } else {
        price += 20;
      }
    });

    return price;
  }

  public get formControls() {
    return this.bookingForm.controls;
  }

  constructor(public formValidatorService: FormValidatorService) {
  }

  public ngOnInit(): void {
    this.bookingForm = new FormGroup({
      'name': new FormControl(null, [Validators.required, Validators.maxLength(35)]),
      'surname': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  public isInvalid(formControlName: GeneralFormControlName): boolean {
    return this.formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }

  public onSubmit(): void {
    console.log('submit');
  }

  public changePrice(d: Seat): void {
    d.halfPriceTicket = !d.halfPriceTicket;
    console.log('status', d);
  }
}

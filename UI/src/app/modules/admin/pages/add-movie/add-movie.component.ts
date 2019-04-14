import {Component, OnInit} from '@angular/core';
import {Seat} from '../../../booking/pages/booking-process/components/booking-preparation/models/seat';
import {SeanceApiModel} from '../../../booking/pages/booking-process/components/booking-preparation/api-models/seance-api.model';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GeneralFormControlName} from '../../../../shared/enums/general-form-control-name.enum';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {BookingApiModel} from '../../../booking/pages/booking-process/components/booking-finalization/api-models/booking-api.model';
import {AddMovieApiModel} from './api-models/add-movie-api.model';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  public get formControls() {
    console.log(this.bookingForm.controls.posterUrl);
    return this.bookingForm.controls;
  }

  public addMovieModel: AddMovieApiModel = new AddMovieApiModel();
  public bookingForm: FormGroup;

  constructor(
    public formValidatorService: FormValidatorService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this._initForm();
  }

  public isInvalid(formControlName: string): boolean {
    return this.formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }

  public onSubmit(): void {
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public valueChanged(rate: number): void {
    this.addMovieModel.rate = rate;
  }

  private _initForm(): void {
    this.bookingForm = new FormGroup({
      'title': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'gender': new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      'duration': new FormControl(null, [Validators.required]),
      'rate': new FormControl(null, [Validators.required, Validators.min(1), Validators.max(5)]),
      'posterUrl': new FormControl(null, [Validators.required]),
      'trailerUrl': new FormControl(null, [Validators.required,
        Validators.pattern('/((([A-Za-z]{3,9}:(?:\\/\\/)?)(?:[\\-;:&=\\+\\$,\\w]+@)?[A-Za-z0-9\\.\\-]+|(?:www\\.|[\\-;:&=\\+\\$,\\w]+@)[A-Za-z0-9\\.\\-]+)((?:\\/[\\+~%\\/\\.\\w\\-_]*)?\\??(?:[\\-\\+=&;%@\\.\\w_]*)#?(?:[\\.\\!\\/\\\\\\w]*))?)/')]),
    });
  }

  private _createBookingApiModel(bookedSeats: Seat[], seance: SeanceApiModel, form: FormGroup): BookingApiModel {
    const bookingApiModel = new BookingApiModel();

    bookingApiModel.seanceId = seance.id;
    bookingApiModel.clientFirstname = form.get('firstname').value;
    bookingApiModel.clientSurname = form.get('surname').value;
    bookingApiModel.clientEmail = form.get('email').value;
    bookedSeats.forEach(seat => bookingApiModel.bookedSeats.push({
      id: seat.id,
      reducedPrice: seat.reducedPrice
    }));

    return bookingApiModel;
  }
}

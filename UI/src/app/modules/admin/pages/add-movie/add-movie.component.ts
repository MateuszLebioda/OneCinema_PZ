import {Component, OnInit} from '@angular/core';
import {Seat} from '../../../booking/pages/booking-process/components/booking-preparation/models/seat';
import {SeanceApiModel} from '../../../booking/pages/booking-process/components/booking-preparation/models/api/seance-api.model';
import {FormGroup} from '@angular/forms';
import {FormValidatorService} from '../../../../shared/services/form-validator.service';
import {Router} from '@angular/router';
import {BookingApiModel} from '../../../booking/pages/booking-process/components/booking-finalization/models/api/booking-api.model';
import {AddMovieApiModel} from './api-models/add-movie-api.model';
import {AddMovieService} from './services/add-movie.service';
import {Subject} from 'rxjs';

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
  public movieDuration: Subject<number> = new Subject();

  constructor(
    private _formValidatorService: FormValidatorService,
    private _addMovieService: AddMovieService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.bookingForm = this._addMovieService.getForm();
  }

  public isInvalid(formControlName: string): boolean {
    return this._formValidatorService.isInvalidAndTouched(this.bookingForm, formControlName);
  }

  public onSubmit(): void {
    // this._router.navigate(['/rezerwacja/potwierdzenie']);
  }

  public valueChanged(rate: number): void {
    this.addMovieModel.rate = rate;
  }

  public emitNewMovieDuration(): void {
    this.movieDuration.next(this.bookingForm.get('duration') ? this.bookingForm.get('duration').value : null);
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

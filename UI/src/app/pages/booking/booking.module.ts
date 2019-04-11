import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from './booking.component';
import {ScreeningRoomComponent} from './components/booking-preparation/components/screening-room/screening-room.component';
import {BookingPreparationComponent} from './components/booking-preparation/booking-preparation.component';
import {BookingFinalizationComponent} from './components/booking-finalization/booking-finalization.component';
import {ReservationComponent} from './components/booking-preparation/components/reservation/reservation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    BookingComponent,
    ScreeningRoomComponent,
    ReservationComponent,
    BookingPreparationComponent,
    BookingFinalizationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BookingModule {
}

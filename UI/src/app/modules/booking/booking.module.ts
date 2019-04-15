import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from './booking.component';
import {ScreeningRoomComponent} from './pages/booking-process/components/booking-preparation/components/screening-room/screening-room.component';
import {BookingPreparationComponent} from './pages/booking-process/components/booking-preparation/booking-preparation.component';
import {BookingFinalizationComponent} from './pages/booking-process/components/booking-finalization/booking-finalization.component';
import {ReservationComponent} from './pages/booking-process/components/booking-preparation/components/reservation/reservation.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BookingConfirmationStartComponent} from './pages/booking-confirmation/booking-confirmation-start/booking-confirmation-start.component';
import {BookingProcessComponent} from './pages/booking-process/booking-process.component';
import {AppRoutingModule} from '../../app-routing.module';
import {BookingConfirmationFinishComponent} from './pages/booking-confirmation/booking-confirmation-finish/booking-confirmation-finish.component';
import {BookingConfirmationComponent} from './pages/booking-confirmation/booking-confirmation.component';
import {BookingServicesModule} from './booking-services.module';

@NgModule({
  declarations: [
    BookingComponent,
    ScreeningRoomComponent,
    ReservationComponent,
    BookingPreparationComponent,
    BookingFinalizationComponent,
    BookingConfirmationStartComponent,
    BookingProcessComponent,
    BookingConfirmationFinishComponent,
    BookingConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    BookingServicesModule
  ]
})
export class BookingModule {
}

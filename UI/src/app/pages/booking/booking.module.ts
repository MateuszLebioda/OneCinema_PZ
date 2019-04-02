import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from './booking.component';
import { ScreeningRoomComponent } from './components/screening-room/screening-room.component';

@NgModule({
  declarations: [
    BookingComponent,
    ScreeningRoomComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookingModule {
}

import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookingComponent} from './booking.component';
import {ScreeningRoomTwoComponent} from './components/screening-room-two/screening-room-two.component';
import {ScreeningRoomOneComponent} from './components/screening-room-one/screening-room-one.component';
import { ScreeningRoomComponent } from './components/screening-room/screening-room.component';

@NgModule({
  declarations: [
    BookingComponent,
    ScreeningRoomTwoComponent,
    ScreeningRoomOneComponent,
    ScreeningRoomComponent
  ],
  imports: [
    CommonModule
  ]
})
export class BookingModule {
}

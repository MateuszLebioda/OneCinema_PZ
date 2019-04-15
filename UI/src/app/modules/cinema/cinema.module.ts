import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CinemaComponent} from './cinema.component';
import {CinemaServicesModule} from './cinema-services.module';

@NgModule({
  declarations: [
    CinemaComponent
  ],
  imports: [
    CommonModule,
    CinemaServicesModule
  ]
})
export class CinemaModule {
}

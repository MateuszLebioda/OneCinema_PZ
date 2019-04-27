import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HomeModule} from './modules/home/home.module';
import {AppRoutingModule} from './app-routing.module';
import {RepertoireModule} from './modules/repertoire/repertoire.module';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localePL from '@angular/common/locales/pl';
import {MovieModule} from './modules/movie/movie.module';
import {CinemaModule} from './modules/cinema/cinema.module';
import {BookingModule} from './modules/booking/booking.module';
import {AdminModule} from './modules/admin/admin.module';
import {SharedModule} from './shared/shared.module';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    HomeModule,
    RepertoireModule,
    MovieModule,
    AppRoutingModule,
    CinemaModule,
    BookingModule,
    AdminModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './pages/home/home.module';
import {AppRoutingModule} from './app-routing.module';
import {RepertoireModule} from './pages/repertoire/repertoire.module';
import {APP_BASE_HREF, HashLocationStrategy, LocationStrategy, registerLocaleData} from '@angular/common';
import localePL from '@angular/common/locales/pl';
import {MovieModule} from './pages/movie/movie.module';
import {CinemaModule} from './pages/cinema/cinema.module';
import {BookingModule} from './pages/booking/booking.module';

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
    BookingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

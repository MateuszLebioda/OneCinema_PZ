import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
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
import {DeviceDetectorModule} from 'ngx-device-detector';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {GlobalErrorHandlerService} from './shared/services/errors/global-error-handler.service';
import {ServerErrorInterceptorService} from './shared/services/errors/server-error.interceptor.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material';

registerLocaleData(localePL);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    DeviceDetectorModule.forRoot(),
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
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    {provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

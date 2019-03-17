import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './pages/home/home.module';
import {AppRoutingModule} from './app-routing.module';
import {RepertoireModule} from './pages/repertoire/repertoire.module';
import {APP_BASE_HREF, registerLocaleData} from '@angular/common';
import localePL from '@angular/common/locales/pl';

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
    AppRoutingModule
  ],
  providers: [
    {provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

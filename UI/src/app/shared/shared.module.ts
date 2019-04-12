import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {FooterComponent} from './components/footer/footer.component';
import {LoginRegisterPopUpComponent} from './components/login-register-pop-up/login-register-pop-up.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SafePipe} from '../modules/movie/pipes/safe.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent
  ],
})
export class SharedModule {
}

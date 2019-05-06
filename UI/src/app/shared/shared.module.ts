import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/internal/header/header.component';
import {NavbarComponent} from './components/internal/navbar/navbar.component';
import {FooterComponent} from './components/internal/footer/footer.component';
import {LoginRegisterPopUpComponent} from './components/internal/login-register-pop-up/login-register-pop-up.component';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {SharedServicesModule} from './shared-services.module';
import {SafePipe} from './pipes/safe.pipe';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent,
    SafePipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    SharedServicesModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent,
    SafePipe
  ],
})
export class SharedModule {
}

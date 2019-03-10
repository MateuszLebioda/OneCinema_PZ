import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginRegisterPopUpComponent } from './login-register-pop-up/login-register-pop-up.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent,
    LoginRegisterPopUpComponent
  ]
})
export class SharedModule { }

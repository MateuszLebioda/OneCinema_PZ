import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountServicesModule} from './account-services.module';
import {LoginComponent} from './pages/login/login.component';
import {SharedModule} from '../../shared/shared.module';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AccountServicesModule
  ]
})
export class AccountModule {
}

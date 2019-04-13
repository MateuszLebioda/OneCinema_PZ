import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import {AppRoutingModule} from '../../app-routing.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ]
})
export class AdminModule {
}

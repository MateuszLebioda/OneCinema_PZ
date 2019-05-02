import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {AddMovieComponent} from './pages/add-movie/add-movie.component';
import {EditMovieComponent} from './pages/edit-movie/edit-movie.component';
import {PreviewMovieComponent} from './pages/preview-movie/preview-movie.component';
import {SeanceComponent} from './pages/add-movie/components/seance/seance.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminServicesModule} from './admin-services.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {EditPriceListComponent} from './pages/edit-price-list/edit-price-list.component';
import {CurrentPriceListComponent} from './pages/edit-price-list/components/current-price-list/current-price-list.component';
import {TargetPriceListComponent} from './pages/edit-price-list/components/target-price-list/target-price-list.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    AddMovieComponent,
    EditMovieComponent,
    PreviewMovieComponent,
    SeanceComponent,
    EditPriceListComponent,
    CurrentPriceListComponent,
    TargetPriceListComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminServicesModule,
    NgMultiSelectDropDownModule,
    SharedModule
  ]
})
export class AdminModule {
}

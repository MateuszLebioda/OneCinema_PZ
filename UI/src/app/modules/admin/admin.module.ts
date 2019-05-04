import {AdminComponent} from './admin.component';
import {NgModule} from '@angular/core';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {MovieProcessingComponent} from './pages/movie-processing/movie-processing.component';
import {MoviePreviewComponent} from './pages/movie-preview/movie-preview.component';
import {SeanceComponent} from './pages/movie-processing/components/seance/seance.component';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../../app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminServicesModule} from './admin-services.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {EditPriceListComponent} from './pages/edit-price-list/edit-price-list.component';
import {CurrentPriceListComponent} from './pages/edit-price-list/components/current-price-list/current-price-list.component';
import {TargetPriceListComponent} from './pages/edit-price-list/components/target-price-list/target-price-list.component';
import {SharedModule} from '../../shared/shared.module';
import {MovieSeancesPreviewComponent} from './pages/movie-preview/components/movie-seances-preview/movie-seances-preview.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    MovieProcessingComponent,
    MoviePreviewComponent,
    SeanceComponent,
    EditPriceListComponent,
    CurrentPriceListComponent,
    TargetPriceListComponent,
    MovieSeancesPreviewComponent
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

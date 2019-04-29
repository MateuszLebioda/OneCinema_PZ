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


@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    AddMovieComponent,
    EditMovieComponent,
    PreviewMovieComponent,
    SeanceComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminServicesModule
  ]
})
export class AdminModule {
}

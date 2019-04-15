import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {AppRoutingModule} from '../../app-routing.module';
import {AddMovieComponent} from './pages/add-movie/add-movie.component';
import {EditMovieComponent} from './pages/edit-movie/edit-movie.component';
import {PreviewMovieComponent} from './pages/preview-movie/preview-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MovieProjectionComponent} from './pages/add-movie/components/movie-projection/movie-projection.component';
import {AdminServicesModule} from './admin-services.module';

@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    AddMovieComponent,
    EditMovieComponent,
    PreviewMovieComponent,
    MovieProjectionComponent
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

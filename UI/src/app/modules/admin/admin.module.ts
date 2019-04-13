import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdminComponent} from './admin.component';
import {AdminPanelComponent} from './pages/admin-panel/admin-panel.component';
import {AppRoutingModule} from '../../app-routing.module';
import {AddMovieComponent} from './pages/add-movie/add-movie.component';
import {EditMovieComponent} from './pages/edit-movie/edit-movie.component';
import {PreviewMovieComponent} from './pages/preview-movie/preview-movie.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent,
    AdminPanelComponent,
    AddMovieComponent,
    EditMovieComponent,
    PreviewMovieComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule {
}

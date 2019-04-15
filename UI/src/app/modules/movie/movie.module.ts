import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieComponent} from './movie.component';
import {MovieSeancesComponent} from './components/movie-seances/movie-seances.component';
import {SafePipe} from './pipes/safe.pipe';
import {RouterModule} from '@angular/router';
import {MovieServicesModule} from './movie-services.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieSeancesComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    MovieServicesModule
  ]
})
export class MovieModule {
}

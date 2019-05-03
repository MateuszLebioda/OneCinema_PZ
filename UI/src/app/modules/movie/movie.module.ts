import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieComponent} from './movie.component';
import {MovieSeancesComponent} from './components/movie-seances/movie-seances.component';
import {RouterModule} from '@angular/router';
import {MovieServicesModule} from './movie-services.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  declarations: [
    MovieComponent,
    MovieSeancesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MovieServicesModule,
    SharedModule
  ]
})
export class MovieModule {
}

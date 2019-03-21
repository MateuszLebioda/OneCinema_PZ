import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieComponent} from './movie.component';
import {MovieSeancesComponent} from './components/movie-seances/movie-seances.component';
import {SafePipe} from './pipes/safe.pipe';

@NgModule({
  declarations: [
    MovieComponent,
    MovieSeancesComponent,
    SafePipe
  ],
  imports: [
    CommonModule,
  ]
})
export class MovieModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MovieComponent} from './movie.component';
import { MovieSeancesComponent } from './components/movie-seances/movie-seances.component';

@NgModule({
  declarations: [
    MovieComponent,
    MovieSeancesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MovieModule { }

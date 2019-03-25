import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './pages/home/home.component';
import {RepertoireComponent} from './pages/repertoire/repertoire.component';
import {MovieComponent} from './pages/movie/movie.component';
import {CinemaComponent} from './pages/cinema/cinema.component';

const routes: Routes = [
  {path: '', component: HomeComponent, pathMatch: 'full'},
  {path: 'repertuar', component: RepertoireComponent},
  {path: 'film/:movieId', component: MovieComponent},
  {path: 'kino', component: CinemaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

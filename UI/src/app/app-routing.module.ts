import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './modules/home/home.component';
import {RepertoireComponent} from './modules/repertoire/repertoire.component';
import {MovieComponent} from './modules/movie/movie.component';
import {CinemaComponent} from './modules/cinema/cinema.component';
import {BookingProcessComponent} from './modules/booking/pages/booking-process/booking-process.component';
import {BookingComponent} from './modules/booking/booking.component';
import {BookingConfirmationStartComponent} from './modules/booking/pages/booking-confirmation/booking-confirmation-start/booking-confirmation-start.component';
import {BookingConfirmationFinishComponent} from './modules/booking/pages/booking-confirmation/booking-confirmation-finish/booking-confirmation-finish.component';
import {BookingConfirmationComponent} from './modules/booking/pages/booking-confirmation/booking-confirmation.component';
import {AdminComponent} from './modules/admin/admin.component';
import {AdminPanelComponent} from './modules/admin/pages/admin-panel/admin-panel.component';
import {AddMovieComponent} from './modules/admin/pages/add-movie/add-movie.component';
import {PreviewMovieComponent} from './modules/admin/pages/preview-movie/preview-movie.component';
import {EditMovieComponent} from './modules/admin/pages/edit-movie/edit-movie.component';
import {EditPriceListComponent} from './modules/admin/pages/edit-price-list/edit-price-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'repertuar',
    component: RepertoireComponent
  },
  {
    path: 'film/:movieId',
    component: MovieComponent
  },
  {
    path: 'kino',
    component: CinemaComponent
  },
  {
    path: 'rezerwacja',
    component: BookingComponent,
    children: [
      {
        path: 'potwierdzenie',
        component: BookingConfirmationComponent,
        children: [
          {
            path: '',
            component: BookingConfirmationStartComponent,
            pathMatch: 'full',
          },
          {
            path: ':bookingId',
            component: BookingConfirmationFinishComponent,
          }
        ]
      },
      {
        path: ':seanceId',
        component: BookingProcessComponent
      },
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminPanelComponent
      },
      {
        path: 'panel',
        component: AdminPanelComponent,
        children: [
          // {
          //   path: '',
          //   component: BookingConfirmationStartComponent,
          //   pathMatch: 'full',
          // },
          // {
          //   path: ':bookingId',
          //   component: BookingConfirmationFinishComponent,
          // }
        ]
      },
      {
        path: 'film/dodaj',
        component: AddMovieComponent
      },
      {
        path: 'film/podglad/:movieId',
        component: PreviewMovieComponent
      },
      {
        path: 'film/edycja/:movieId',
        component: EditMovieComponent
      },
      {
        path: 'edycja-cennika',
        component: EditPriceListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

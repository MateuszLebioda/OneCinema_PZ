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
import {MovieProcessingComponent} from './modules/admin/pages/movie-processing/movie-processing.component';
import {MoviePreviewComponent} from './modules/admin/pages/movie-preview/movie-preview.component';
import {EditPriceListComponent} from './modules/admin/pages/edit-price-list/edit-price-list.component';
import {ErrorPageComponent} from './core/errors/error-page/error-page.component';
import {LoginComponent} from './modules/account/pages/login/login.component';

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
      },
      {
        path: 'film/dodaj',
        component: MovieProcessingComponent
      },
      {
        path: 'film/podglad/:movieId',
        component: MoviePreviewComponent
      },
      {
        path: 'film/edytuj/:movieId',
        component: MovieProcessingComponent
      },
      {
        path: 'edycja-cennika',
        component: EditPriceListComponent
      }
    ]
  },
  {
    path: 'blad',
    component: ErrorPageComponent
  },
  {
    path: '91b77f0c-ce91-42c1-a507-02893d97027d',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

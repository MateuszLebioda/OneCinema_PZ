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
      // {
      //   path: ':seanceId',
      //   component: BookingProcessComponent
      // },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

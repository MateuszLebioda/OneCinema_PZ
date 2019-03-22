import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {BannerComponent} from './components/banner/banner.component';
import {SlideBannerComponent} from './components/slide-banner/slide-banner.component';
import {TodaysRepertoireComponent} from './components/todays-repertoire/todays-repertoire.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SlideBannerComponent,
    TodaysRepertoireComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}

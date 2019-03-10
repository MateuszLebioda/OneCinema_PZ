import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {BannerComponent} from './components/banner/banner.component';
import {SlideBannerComponent} from './components/slide-banner/slide-banner.component';

@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    SlideBannerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule {
}

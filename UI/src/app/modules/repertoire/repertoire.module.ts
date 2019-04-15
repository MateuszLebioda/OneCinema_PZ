import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RepertoireComponent} from './repertoire.component';
import {RepertoireServicesModule} from './repertoire-services.module';

@NgModule({
  declarations: [
    RepertoireComponent
  ],
  imports: [
    CommonModule,
    RepertoireServicesModule
  ],
  exports: [
    RepertoireComponent
  ]
})
export class RepertoireModule {
}

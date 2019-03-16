import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepertoireListComponent } from './components/repertoire-list/repertoire-list.component';
import {RepertoireComponent} from './repertoire.component';

@NgModule({
  declarations: [
    RepertoireComponent,
    RepertoireListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    RepertoireComponent
  ]
})
export class RepertoireModule { }

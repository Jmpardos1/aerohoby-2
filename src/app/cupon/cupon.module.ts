import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuponListComponent } from './cupon-list/cupon-list.component';

@NgModule({
  declarations: [
    CuponListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CuponListComponent
  ]
})
export class CuponModule { }

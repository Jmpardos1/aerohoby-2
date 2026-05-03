import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoListComponent } from './producto-list/producto-list.component';



@NgModule({
  declarations: [
    ProductoListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProductoListComponent
  ]
})
export class ProductoModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenCompraDetailComponent } from './orden-compra-detail/orden-compra-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdenCompraDetailComponent
  ],
  exports: [
    OrdenCompraDetailComponent
  ]
})
export class OrdenCompraModule { }

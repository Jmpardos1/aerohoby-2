import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventarioDetailComponent } from './inventario-detail/inventario-detail.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    InventarioDetailComponent
  ],
  exports: [
    InventarioDetailComponent
  ]
})
export class GestionarInventarioModule { }
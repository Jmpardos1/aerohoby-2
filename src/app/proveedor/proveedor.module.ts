import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorListComponent } from './proveedor-list/proveedor-list.component';
import { ProveedorDetailComponent } from './proveedor-detail/proveedor-detail.component';

@NgModule({
  declarations: [
    ProveedorListComponent,
    ProveedorDetailComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProveedorListComponent
  ]
})
export class ProveedorModule { }

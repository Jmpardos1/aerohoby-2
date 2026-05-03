import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';



@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ProductoListComponent
  ]
})
export class ProductoModule { }

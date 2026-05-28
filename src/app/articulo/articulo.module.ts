import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArticuloListComponent } from './articulo-list/articulo-list.component';
import { ArticuloDetailComponent } from './articulo-detail/articulo-detail.component';



@NgModule({
  declarations: [
    ArticuloListComponent,
    ArticuloDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ArticuloListComponent
  ]
})
export class ArticuloModule {}

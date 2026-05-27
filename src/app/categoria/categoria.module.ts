import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaListComponent } from './categoria-list/categoria-list.component';

@NgModule({
  declarations: [
    CategoriaListComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CategoriaListComponent
  ]
})
export class CategoriaModule { }

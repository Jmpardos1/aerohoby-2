import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ArticuloListComponent } from './articulo-list/articulo-list.component';
import { ArticuloDetailComponent } from './articulo-detail/articulo-detail.component';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    ArticuloListComponent,
    ArticuloDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    PublicNavComponent,
    FooterComponent,
  ],
  exports: [
    ArticuloListComponent
  ]
})
export class ArticuloModule {}

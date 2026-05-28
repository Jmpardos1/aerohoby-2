import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductoListComponent } from './producto-list/producto-list.component';
import { ProductoDetailComponent } from './producto-detail/producto-detail.component';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    ProductoListComponent,
    ProductoDetailComponent,
    ProductoAdminComponent,
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
    ProductoListComponent
  ]
})
export class ProductoModule { }

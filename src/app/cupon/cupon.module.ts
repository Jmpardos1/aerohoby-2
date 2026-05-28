import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuponListComponent } from './cupon-list/cupon-list.component';
import { CuponAdminComponent } from './cupon-admin/cupon-admin.component';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [
    CuponListComponent,
    CuponAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    PublicNavComponent,
    FooterComponent
  ],
  exports: [
    CuponListComponent,
    CuponAdminComponent
  ]
})
export class CuponModule { }

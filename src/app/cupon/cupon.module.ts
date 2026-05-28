import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CuponListComponent } from './cupon-list/cupon-list.component';
import { CuponAdminComponent } from './cupon-admin/cupon-admin.component';

@NgModule({
  declarations: [
    CuponListComponent,
    CuponAdminComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CuponListComponent,
    CuponAdminComponent
  ]
})
export class CuponModule { }

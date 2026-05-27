import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CuponListComponent } from './cupon-list/cupon-list.component';
import { CuponAdminComponent } from './cupon-admin/cupon-admin.component';

@NgModule({
  declarations: [
    CuponListComponent,
    CuponAdminComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class CuponModule { }

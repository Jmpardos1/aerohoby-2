import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReviewListComponent } from './review-list/review-list';
import { ReviewDetailComponent } from './review-detail/review-detail';

@NgModule({
  declarations: [
    ReviewListComponent,
    ReviewDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    ReviewListComponent,
    ReviewDetailComponent
  ]
})
export class ReviewModule { }

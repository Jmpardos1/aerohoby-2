import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list/orden-compra-list.component';
import { ReviewDetailComponent } from './review/review-detail/review-detail';

const routes: Routes = [
  { path: '', redirectTo: '/ordenes-compra', pathMatch: 'full' },
  { path: 'ordenes-compra', component: OrdenCompraListComponent },
  { path: 'reviews/:id', component: ReviewDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

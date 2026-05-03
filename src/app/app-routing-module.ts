import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list/orden-compra-list.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ReviewDetailComponent } from './review/review-detail/review-detail';

const routes: Routes = [
  { path: '', redirectTo: '/ordenes-compra', pathMatch: 'full' },
  { path: 'ordenes-compra', component: OrdenCompraListComponent },
  { path: 'reviews/:id', component: ReviewDetailComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductoListComponent },
  { path: 'ordenes-compra', component: OrdenCompraListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

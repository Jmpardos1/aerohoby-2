import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list/orden-compra-list.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ReviewDetailComponent } from './review/review-detail/review-detail';
import { authGuard } from './usuario/auth.guard';
import { CarritoComponent } from './carrito/carrito/carrito.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductoListComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'ordenes-compra', component: OrdenCompraListComponent, canActivate: [authGuard] },
  { path: 'reviews/:id', component: ReviewDetailComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

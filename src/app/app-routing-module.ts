import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list/orden-compra-list.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ReviewDetailComponent } from './review/review-detail/review-detail';
import { authGuard } from './usuario/auth.guard';
import { adminGuard } from './usuario/admin.guard';
import { CuponListComponent } from './cupon/cupon-list/cupon-list.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { ProveedorListComponent } from './proveedor/proveedor-list/proveedor-list.component';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'productos', component: ProductoListComponent, canActivate: [authGuard] },
  { path: 'categorias', component: CategoriaListComponent, canActivate: [authGuard] },
  { path: 'proveedores', component: ProveedorListComponent, canActivate: [authGuard, adminGuard] },
  { path: 'articulos', component: ArticuloListComponent, canActivate: [authGuard] },
  { path: 'ordenes-compra', component: OrdenCompraListComponent, canActivate: [authGuard] },
  { path: 'cupones', component: CuponListComponent, canActivate: [authGuard, adminGuard] },
  { path: 'reviews/:id', component: ReviewDetailComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrdenCompraListComponent } from './orden-compra/orden-compra-list/orden-compra-list.component';
import { LoginComponent } from './usuario/login/login.component';
import { RegisterComponent } from './usuario/register/register.component';
import { ProductoListComponent } from './producto/producto-list/producto-list.component';
import { ProductoAdminComponent } from './producto/producto-admin/producto-admin.component';
import { ReviewDetailComponent } from './review/review-detail/review-detail';
import { ReviewListComponent } from './review/review-list/review-list';
import { authGuard } from './usuario/auth.guard';
import { adminGuard } from './usuario/admin.guard';
import { guestGuard } from './usuario/guest.guard';
import { CuponListComponent } from './cupon/cupon-list/cupon-list.component';
import { CuponAdminComponent } from './cupon/cupon-admin/cupon-admin.component';
import { CategoriaListComponent } from './categoria/categoria-list/categoria-list.component';
import { ProveedorListComponent } from './proveedor/proveedor-list/proveedor-list.component';
import { ArticuloListComponent } from './articulo/articulo-list/articulo-list.component';
import { ArticuloDetailComponent } from './articulo/articulo-detail/articulo-detail.component';
import { CarritoComponent } from './carrito/carrito/carrito.component';
import { PerfilComponent } from './usuario/perfil/perfil.component';
import { RecuperarContrasenaComponent } from './usuario/recuperar-contrasena/recuperar-contrasena.component';
import { UsuarioAdminComponent } from './usuario/usuario-admin/usuario-admin.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent, canActivate: [guestGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [guestGuard] },
  { path: 'recuperar-contrasena', component: RecuperarContrasenaComponent, canActivate: [guestGuard] },
  { path: 'productos', component: ProductoListComponent },
  { path: 'categorias', component: CategoriaListComponent, canActivate: [authGuard] },
  { path: 'proveedores', component: ProveedorListComponent, canActivate: [authGuard, adminGuard] },
  { path: 'articulos', component: ArticuloListComponent },
  { path: 'ordenes-compra', component: OrdenCompraListComponent, canActivate: [authGuard] },
  { path: 'cupones', component: CuponListComponent, canActivate: [authGuard] },
  { path: 'carrito', component: CarritoComponent, canActivate: [authGuard] },
  { path: 'reviews', component: ReviewListComponent, canActivate: [authGuard] },
  { path: 'reviews/:id', component: ReviewDetailComponent, canActivate: [authGuard] },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: 'admin/cupones', component: CuponAdminComponent, canActivate: [authGuard] },
  { path: 'admin/usuarios', component: UsuarioAdminComponent, canActivate: [authGuard] },
  { path: 'admin/productos', component: ProductoAdminComponent, canActivate: [authGuard] },
  { path: 'articulos/:id', component: ArticuloDetailComponent, canActivate: [authGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

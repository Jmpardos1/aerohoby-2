import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LandingComponent } from './landing/landing.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ProductoModule } from './producto/producto.module';
import { UsuarioModule } from './usuario/usuario.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReviewModule } from './review/review-module';
import { CuponModule } from './cupon/cupon.module';
import { CategoriaModule } from './categoria/categoria.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ArticuloModule } from './articulo/articulo.module';
import { CarritoModule } from './carrito/carrito.module';
import { CuponModule } from './cupon/cupon.module';
import { ArticuloModule } from './articulo/articulo.module';
import { AuthInterceptor } from './usuario/auth.interceptor';

@NgModule({
  declarations: [
    App,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    OrdenCompraModule,
    ProductoModule,
    CategoriaModule,
    CuponModule,
    ProveedorModule,
    ArticuloModule,
    ReviewModule,
    UsuarioModule,
    CarritoModule,
    CuponModule,
    ArticuloModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }

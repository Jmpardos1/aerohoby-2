import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { OrdenCompraModule } from './orden-compra/orden-compra.module';
import { ProductoModule } from './producto/producto.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewModule } from './review/review-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    OrdenCompraModule,
    ProductoModule,
    ReviewModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }

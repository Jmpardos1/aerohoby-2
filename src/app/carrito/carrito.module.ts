import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@NgModule({
  declarations: [CarritoComponent],
  imports: [CommonModule, RouterModule, PublicNavComponent, FooterComponent]
})
export class CarritoModule {}

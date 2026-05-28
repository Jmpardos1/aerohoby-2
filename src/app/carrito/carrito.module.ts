import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  declarations: [CarritoComponent],
  imports: [CommonModule, RouterModule]
})
export class CarritoModule {}

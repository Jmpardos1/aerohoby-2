import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoItem } from '../carrito-item';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  constructor(public carritoService: CarritoService, private router: Router) {}

  get items(): CarritoItem[] {
    return this.carritoService.getItems();
  }

  cambiarCantidad(item: CarritoItem, delta: number): void {
    const nueva = item.cantidad + delta;
    if (nueva <= 0) {
      this.carritoService.quitar(item.productoId);
    } else {
      this.carritoService.actualizarCantidad(item.productoId, nueva);
    }
  }

  quitar(productoId: string): void {
    this.carritoService.quitar(productoId);
  }

  seguirComprando(): void {
    this.router.navigate(['/productos']);
  }
}

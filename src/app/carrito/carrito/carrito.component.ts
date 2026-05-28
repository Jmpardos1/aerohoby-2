import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CarritoItem } from '../carrito-item';
import { CarritoService } from '../carrito.service';
import { OrdenCompraService } from '../../orden-compra/orden-compra-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrito',
  standalone: false,
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  confirmando = false;
  procesando = false;

  constructor(
    public carritoService: CarritoService,
    private ordenService: OrdenCompraService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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

  confirmarCompra(): void {
    this.confirmando = true;
  }

  procesarCompra(): void {
    const uid = localStorage.getItem('uid');
    if (!uid) return;

    this.procesando = true;
    const ahora = new Date();

    const requests = this.items.map(item =>
      this.ordenService.createOrdenCompra({
        fechaOrden: ahora,
        estadoPedido: 'PAGADO',
        usuarioId: uid,
        productoId: item.productoId
      })
    );

    forkJoin(requests).subscribe({
      next: () => {
        this.carritoService.vaciar();
        this.confirmando = false;
        this.procesando = false;
        this.toastr.success('¡Compra realizada exitosamente!', 'Pedido confirmado');
        this.router.navigate(['/ordenes-compra']);
      },
      error: () => {
        this.procesando = false;
        this.toastr.error('Ocurrió un error al procesar tu pedido.', 'Error');
      }
    });
  }
}

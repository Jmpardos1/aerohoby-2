import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CarritoItem } from './carrito-item';
import { Producto } from '../producto/producto';

const CARRITO_KEY = 'carrito';

@Injectable({ providedIn: 'root' })
export class CarritoService {
  private items: CarritoItem[] = [];

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(CARRITO_KEY);
      this.items = saved ? JSON.parse(saved) : [];
    }
  }

  getItems(): CarritoItem[] {
    return this.items;
  }

  agregar(producto: Producto): void {
    const existente = this.items.find(i => i.productoId === String(producto.id));
    if (existente) {
      existente.cantidad++;
    } else {
      this.items.push({ productoId: String(producto.id), nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
    }
    this.guardar();
  }

  quitar(productoId: string): void {
    this.items = this.items.filter(i => i.productoId !== productoId);
    this.guardar();
  }

  actualizarCantidad(productoId: string, cantidad: number): void {
    const item = this.items.find(i => i.productoId === productoId);
    if (item) {
      item.cantidad = cantidad;
      this.guardar();
    }
  }

  vaciar(): void {
    this.items = [];
    this.guardar();
  }

  getTotal(): number {
    return this.items.reduce((total, i) => total + i.precio * i.cantidad, 0);
  }

  getCantidadTotal(): number {
    return this.items.reduce((total, i) => total + i.cantidad, 0);
  }

  private guardar(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(CARRITO_KEY, JSON.stringify(this.items));
    }
  }
}

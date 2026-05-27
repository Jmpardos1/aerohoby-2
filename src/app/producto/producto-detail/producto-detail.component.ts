import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { CarritoService } from '../../carrito/carrito.service';
import { AuthService } from '../../usuario/auth.service';

@Component({
  selector: 'app-producto-detail',
  standalone: false,
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css',
})
export class ProductoDetailComponent implements OnInit {
  @Input() productoDetail!: Producto;
  agregado = false;

  constructor(private readonly carritoService: CarritoService, private readonly authService: AuthService) {}
  ngOnInit(): void {}

  get esAdmin(): boolean {
    return this.authService.getRol() === 'ADMIN';
  }

  agregarAlCarrito(): void {
    this.carritoService.agregar(this.productoDetail);
    this.agregado = true;
    setTimeout(() => (this.agregado = false), 2000);
  }
}

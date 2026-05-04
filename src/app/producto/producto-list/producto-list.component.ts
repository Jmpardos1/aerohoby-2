import { Component, OnInit } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { Categoria } from '../../categoria/categoria';
import { CarritoService } from '../../carrito/carrito.service';

@Component({
  selector: 'app-producto-list',
  standalone: false,
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css',
})
export class ProductoListComponent implements OnInit {
  productos: Array<Producto> = [];

  precioMaximo: number | null = null;
  categoriaSeleccionadaId: number | null = null;
  mostrarCategorias = false;

  selectedProducto: Producto | null = null;

  constructor(private productoService: ProductoService, public carritoService: CarritoService) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
    });
  }

  get productosFiltrados(): Array<Producto> {
    return this.productos.filter((producto) => {
      const cumplePrecio = this.precioMaximo === null || producto.precio <= this.precioMaximo;
      const cumpleCategoria = this.categoriaSeleccionadaId === null ||
        producto.categoria?.some((categoria) => categoria.id === this.categoriaSeleccionadaId);

      return cumplePrecio && cumpleCategoria;
    });
  }

  get categoriasDisponibles(): Array<Categoria> {
    const categorias = new Map<number, Categoria>();

    this.productos.forEach((producto) => {
      producto.categoria?.forEach((categoria) => {
        categorias.set(categoria.id, categoria);
      });
    });

    return Array.from(categorias.values());
  }

  get categoriaSeleccionada(): Categoria | undefined {
    return this.categoriasDisponibles.find((categoria) => categoria.id === this.categoriaSeleccionadaId);
  }

  alternarCategorias(): void {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  seleccionarCategoria(categoriaId: number | null): void {
    this.categoriaSeleccionadaId = categoriaId;
    this.mostrarCategorias = false;
  }

  limpiarFiltroPrecio(): void {
    this.precioMaximo = null;
  }

  onSelected(producto: Producto): void {
    this.selectedProducto = producto;
  }

}

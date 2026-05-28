import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  private productoIdSolicitado: string | null = null;
  precioSlider = 0;
  categoriaSeleccionadaId: number | null = null;
  mostrarCategorias = false;
  selectedProducto: Producto | null = null;
  textoBusqueda = '';
  mostrarFiltros = false;

  get tieneFilrosActivos(): boolean {
    return this.precioSlider < this.precioSliderMax || this.categoriaSeleccionadaId !== null;
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    public carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.productoIdSolicitado = params.get('productoId');
      this.aplicarProductoSolicitado();
    });
    this.getProductos();
  }

  getProductos(): void {
    this.productoService.getProductos().subscribe((data) => {
      this.productos = data;
      this.precioSlider = this.precioSliderMax;
      this.aplicarProductoSolicitado();
    });
  }

  get precioSliderMax(): number {
    if (!this.productos.length) return 1000000;
    return Math.ceil(Math.max(...this.productos.map(p => p.precio)) / 1000) * 1000;
  }

  get sliderBackground(): string {
    const pct = this.precioSliderMax
      ? (this.precioSlider / this.precioSliderMax) * 100
      : 100;
    return `linear-gradient(to right, #ffffff ${pct}%, rgba(255,255,255,0.15) ${pct}%)`;
  }

  get productosFiltrados(): Array<Producto> {
    const texto = this.textoBusqueda.toLowerCase().trim();
    return this.productos.filter((producto) => {
      const cumplePrecio = producto.precio <= this.precioSlider;
      const cumpleCategoria = this.categoriaSeleccionadaId === null ||
        producto.categoria?.some((c) => c.id === this.categoriaSeleccionadaId);
      const cumpleBusqueda = !texto ||
        producto.nombre?.toLowerCase().includes(texto) ||
        producto.descripcion?.toLowerCase().includes(texto) ||
        producto.marca?.nombre?.toLowerCase().includes(texto);
      return cumplePrecio && cumpleCategoria && cumpleBusqueda;
    });
  }

  get categoriasDisponibles(): Array<Categoria> {
    const categorias = new Map<number, Categoria>();
    this.productos.forEach((p) => p.categoria?.forEach((c) => categorias.set(c.id, c)));
    return Array.from(categorias.values());
  }

  get categoriaSeleccionada(): Categoria | undefined {
    return this.categoriasDisponibles.find((c) => c.id === this.categoriaSeleccionadaId);
  }

  alternarCategorias(): void {
    this.mostrarCategorias = !this.mostrarCategorias;
  }

  seleccionarCategoria(id: number | null): void {
    this.categoriaSeleccionadaId = id;
    this.mostrarCategorias = false;
  }

  resetFiltros(): void {
    this.precioSlider = this.precioSliderMax;
    this.categoriaSeleccionadaId = null;
    this.textoBusqueda = '';
  }

  onSelected(producto: Producto): void {
    this.selectedProducto = producto;
  }

  private aplicarProductoSolicitado(): void {
    if (!this.productoIdSolicitado || !this.productos.length) {
      return;
    }

    const producto = this.productos.find(
      (item) => String(item.id) === this.productoIdSolicitado
    );

    if (producto) {
      this.selectedProducto = producto;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloDetail } from '../articulo-detail';
import { ArticuloService } from '../articulo.service';
import { ProductoService } from '../../producto/producto.service';
import { Producto } from '../../producto/producto';

@Component({
  selector: 'app-articulo-list',
  standalone: false,
  templateUrl: './articulo-list.component.html',
  styleUrl: './articulo-list.component.css',
})
export class ArticuloListComponent implements OnInit {
  articulos: Articulo[] = [];
  todosArticulos: Articulo[] = [];
  productos: Producto[] = [];

  selectedArticulo: ArticuloDetail | null = null;
  isLoading = false;
  isDetailLoading = false;
  errorMessage = '';
  detailErrorMessage = '';

  textoBusqueda = '';
  autorSeleccionadoId: string | null = null;
  productoSeleccionadoId: string | null = null;
  mostrarFiltros = false;
  mostrarAutores = false;
  mostrarProductos = false;

  constructor(
    private articuloService: ArticuloService,
    private productoService: ProductoService,
  ) {}

  ngOnInit(): void {
    this.loadArticulos();
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; },
      error: () => {}
    });
  }

  loadArticulos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.articuloService.getArticulos().subscribe({
      next: (data: Articulo[]) => {
        this.todosArticulos = data || [];
        this.articulos = this.todosArticulos;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al cargar artículos.';
        this.isLoading = false;
      }
    });
  }

  get autoresDisponibles(): Array<{ id: string; nombre: string }> {
    const autores = new Map<string, string>();
    this.todosArticulos.forEach((articulo) => {
      if (articulo.autor?.id && articulo.autor?.nombre) {
        autores.set(String(articulo.autor.id), articulo.autor.nombre);
      }
    });
    return Array.from(autores.entries()).map(([id, nombre]) => ({ id, nombre }));
  }

  get articulosFiltrados(): Articulo[] {
    const texto = this.textoBusqueda.toLowerCase().trim();
    return this.todosArticulos.filter((a) => {
      const productosAsociados = a.productos ?? [];
      const coincideProductoAsociado = this.productoSeleccionadoId === null
        || productosAsociados.some((producto) => String(producto.id) === this.productoSeleccionadoId);
      const cumpleTexto = !texto ||
        a.titulo?.toLowerCase().includes(texto) ||
        a.descripcion?.toLowerCase().includes(texto) ||
        a.autor?.nombre?.toLowerCase().includes(texto) ||
        productosAsociados.some((producto) =>
          producto.nombre?.toLowerCase().includes(texto) ||
          producto.descripcion?.toLowerCase().includes(texto)
        );
      const cumpleAutor = !this.autorSeleccionadoId ||
        String(a.autor?.id) === this.autorSeleccionadoId;
      return cumpleTexto && cumpleAutor && coincideProductoAsociado;
    });
  }

  get tieneFiltrosActivos(): boolean {
    return !!this.autorSeleccionadoId || this.productoSeleccionadoId !== null || !!this.textoBusqueda.trim();
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
    this.mostrarAutores = false;
    this.mostrarProductos = false;
  }

  seleccionarAutor(id: string | null): void {
    this.autorSeleccionadoId = id;
    this.mostrarAutores = false;
  }

  seleccionarProducto(id: string | null): void {
    this.productoSeleccionadoId = id;
    this.mostrarProductos = false;
    this.selectedArticulo = null;
  }

  get productoSeleccionado(): Producto | undefined {
    return this.productos.find((p) => String(p.id) === this.productoSeleccionadoId);
  }

  get autorSeleccionado(): { id: string; nombre: string } | undefined {
    return this.autoresDisponibles.find((autor) => autor.id === this.autorSeleccionadoId);
  }

  productoId(producto: Producto): string {
    return String(producto.id);
  }

  resetFiltros(): void {
    this.autorSeleccionadoId = null;
    this.productoSeleccionadoId = null;
    this.textoBusqueda = '';
  }

  verDetalle(articulo: Articulo): void {
    this.isDetailLoading = true;
    this.detailErrorMessage = '';
    this.articuloService.getArticuloDetail(String(articulo.id)).subscribe({
      next: (detail: ArticuloDetail) => {
        this.selectedArticulo = detail;
        this.isDetailLoading = false;
      },
      error: () => {
        this.detailErrorMessage = 'Error al cargar el detalle del artículo.';
        this.isDetailLoading = false;
      }
    });
  }
}

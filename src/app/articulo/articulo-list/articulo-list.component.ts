import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forkJoin, of } from 'rxjs';
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

  // Crear artículo
  mostrarFormCrear = false;
  crearForm!: FormGroup;
  productosSeleccionados = new Set<string>();
  guardando = false;
  errorCrear = '';

  constructor(
    private articuloService: ArticuloService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
  ) {}

  get puedeCrear(): boolean {
    const rol = localStorage.getItem('rol');
    return rol === 'EXPERT' || rol === 'ADMIN';
  }

  ngOnInit(): void {
    this.crearForm = this.fb.group({
      titulo:           ['', Validators.required],
      descripcion:      ['', Validators.required],
      contenido:        ['', Validators.required],
      fechaPublicacion: ['', Validators.required],
    });
    this.loadArticulos();
    this.productoService.getProductos().subscribe({
      next: (data) => { this.productos = data; },
      error: () => {}
    });
  }

  toggleProductoSeleccionado(id: string): void {
    this.productosSeleccionados.has(id)
      ? this.productosSeleccionados.delete(id)
      : this.productosSeleccionados.add(id);
  }

  isProductoSeleccionado(id: string): boolean {
    return this.productosSeleccionados.has(id);
  }

  abrirFormCrear(): void {
    this.mostrarFormCrear = true;
    this.errorCrear = '';
    this.crearForm.reset();
    this.productosSeleccionados.clear();
  }

  cerrarFormCrear(): void {
    this.mostrarFormCrear = false;
    this.errorCrear = '';
  }

  crearArticulo(): void {
    if (this.crearForm.invalid || this.guardando) return;
    const uid = localStorage.getItem('uid');
    if (!uid) return;

    this.guardando = true;
    this.errorCrear = '';

    const { titulo, descripcion, contenido, fechaPublicacion } = this.crearForm.value;

    this.articuloService.createArticulo({
      titulo, descripcion, contenido, fechaPublicacion, autorId: uid
    }).subscribe({
      next: (articulo) => {
        const ids = Array.from(this.productosSeleccionados);
        const peticiones = ids.length
          ? ids.map(pid => this.articuloService.addProducto(String(articulo.id), pid))
          : [of(null)];

        forkJoin(peticiones).subscribe({
          next: () => {
            this.guardando = false;
            this.cerrarFormCrear();
            this.loadArticulos();
          },
          error: () => {
            this.guardando = false;
            this.cerrarFormCrear();
            this.loadArticulos();
          }
        });
      },
      error: (e: any) => {
        this.guardando = false;
        this.errorCrear = e?.error?.apierror?.message || e?.error?.message || 'Error al crear el artículo.';
      }
    });
  }

  private abrirDesdeParam(articuloId: string): void {
    const articulo = this.todosArticulos.find(a => String(a.id) === articuloId);
    if (articulo) this.verDetalle(articulo);
  }

  loadArticulos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.articuloService.getArticulos().subscribe({
      next: (data: Articulo[]) => {
        this.todosArticulos = data || [];
        this.articulos = this.todosArticulos;
        this.isLoading = false;
        const articuloId = this.route.snapshot.queryParamMap.get('articuloId');
        if (articuloId) this.abrirDesdeParam(articuloId);
      },
      error: () => {
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

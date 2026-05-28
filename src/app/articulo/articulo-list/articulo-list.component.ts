import { Component, OnInit } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloDetail } from '../articulo-detail';
import { ArticuloService } from '../articulo.service';
import { AuthService } from '../../usuario/auth.service';

@Component({
  selector: 'app-articulo-list',
  standalone: false,
  templateUrl: './articulo-list.component.html',
  styleUrl: './articulo-list.component.css',
})
export class ArticuloListComponent implements OnInit {
  articulos: Articulo[] = [];
  selectedArticulo: ArticuloDetail | null = null;
  isLoading: boolean = false;
  isDetailLoading: boolean = false;
  errorMessage: string = '';
  detailErrorMessage: string = '';

  mostrarFormCrear = false;
  nuevoTitulo = '';
  nuevaDescripcion = '';
  nuevoContenido = '';
  nuevaFecha = '';
  errorCrear = '';

  constructor(private articuloService: ArticuloService, private authService: AuthService) {}

  get puedeCrear(): boolean {
    const rol = this.authService.getRol();
    return rol === 'EXPERT' || rol === 'ADMIN';
  }

  ngOnInit(): void {
    this.loadArticulos();
  }

  loadArticulos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.articuloService.getArticulos().subscribe({
      next: (data: Articulo[]) => {
        this.articulos = data || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al cargar articulos: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar articulos', err);
        this.isLoading = false;
      }
    });
  }

  crearArticulo(): void {
    const autorId = localStorage.getItem('uid');
    if (!this.nuevoTitulo.trim() || !this.nuevaDescripcion.trim() || !this.nuevoContenido.trim() || !this.nuevaFecha || !autorId) {
      this.errorCrear = 'Todos los campos son obligatorios.';
      return;
    }
    this.articuloService.createArticulo({
      titulo: this.nuevoTitulo.trim(),
      descripcion: this.nuevaDescripcion.trim(),
      contenido: this.nuevoContenido.trim(),
      fechaPublicacion: this.nuevaFecha,
      autorId
    }).subscribe({
      next: () => {
        this.mostrarFormCrear = false;
        this.nuevoTitulo = '';
        this.nuevaDescripcion = '';
        this.nuevoContenido = '';
        this.nuevaFecha = '';
        this.errorCrear = '';
        this.loadArticulos();
      },
      error: () => { this.errorCrear = 'Error al crear el artículo.'; }
    });
  }

  verDetalle(articulo: Articulo): void {
    this.isDetailLoading = true;
    this.detailErrorMessage = '';

    this.articuloService.getArticuloDetail(String(articulo.id)).subscribe({
      next: (detail: ArticuloDetail) => {
        this.selectedArticulo = detail;
        this.isDetailLoading = false;
      },
      error: (err: any) => {
        this.detailErrorMessage = 'Error al cargar detalle del articulo: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar detalle del articulo', err);
        this.isDetailLoading = false;
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Articulo } from '../articulo';
import { ArticuloDetail } from '../articulo-detail';
import { ArticuloService } from '../articulo.service';

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

  constructor(private articuloService: ArticuloService) {}

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

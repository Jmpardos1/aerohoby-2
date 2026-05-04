import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-list',
  standalone: false,
  templateUrl: './categoria-list.component.html',
  styleUrl: './categoria-list.component.css',
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private categoriaService: CategoriaService) {}

  ngOnInit(): void {
    this.loadCategorias();
  }

  loadCategorias(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.categoriaService.getCategorias().subscribe({
      next: (data: Categoria[]) => {
        this.categorias = data || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al cargar categorias: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar categorias', err);
        this.isLoading = false;
      }
    });
  }
}

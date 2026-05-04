import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { Inventario } from '../inventario';
import { InventarioService } from '../inventario-service';
import { InventarioDetailComponent } from '../inventario-detail/inventario-detail.component';

@Component({
  selector: 'app-inventario-list',
  standalone: true,
  imports: [CommonModule, InventarioDetailComponent],
  templateUrl: './inventario-list.component.html',
  styleUrls: ['./inventario-list.component.css']
})
export class InventarioListComponent implements OnInit {
  inventarios: Inventario[] = [];
  selectedInventario: Inventario | null = null;
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroyRef = inject(DestroyRef);

  constructor(private inventarioService: InventarioService) {}

  ngOnInit(): void {
    this.loadInventarios();
  }

  loadInventarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.inventarioService.getAllInventarios()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Inventario[]) => {
          this.inventarios = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.errorMessage = 'Error al cargar inventarios: ' + (err.message || 'Error desconocido');
          console.error('Error al cargar inventarios', err);
          this.isLoading = false;
        }
      });
  }

  selectInventario(inv: Inventario): void {
    this.selectedInventario = inv;
  }
}
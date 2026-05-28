import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { OrdenCompra } from '../orden-compra';
import { OrdenCompraService } from '../orden-compra-service';
import { OrdenCompraDetailComponent } from '../orden-compra-detail/orden-compra-detail.component';

@Component({
  selector: 'app-orden-compra-list',
  templateUrl: './orden-compra-list.component.html',
  styleUrls: ['./orden-compra-list.component.css'],
  standalone: true,
  imports: [CommonModule, OrdenCompraDetailComponent]
})
export class OrdenCompraListComponent implements OnInit {
  ordenesCompra: OrdenCompra[] = [];
  selectedOrdenCompra: OrdenCompra | null = null;
  isLoading = false;
  errorMessage = '';

  private destroyRef = inject(DestroyRef);

  constructor(private readonly ordenCompraService: OrdenCompraService) {}

  get esAdmin(): boolean {
    return localStorage.getItem('rol') === 'ADMIN';
  }

  get ordenesFiltradas(): OrdenCompra[] {
    if (this.esAdmin) return this.ordenesCompra;
    const uid = localStorage.getItem('uid');
    return this.ordenesCompra.filter(o => String(o.usuario?.id) === uid);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.ordenCompraService.getAllOrdenCompra()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: OrdenCompra[]) => {
          this.ordenesCompra = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.errorMessage = 'Error al cargar órdenes: ' + (err.message || 'Error desconocido');
          this.isLoading = false;
        }
      });
  }

  selectOrdenCompra(orden: OrdenCompra): void {
    this.selectedOrdenCompra = this.selectedOrdenCompra?.id === orden.id ? null : orden;
  }
}

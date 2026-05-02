import { Component, OnInit } from '@angular/core';
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
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(private ordenCompraService: OrdenCompraService) { }

  ngOnInit(): void {
    this.loadOrdenesCompra();
  }

  loadOrdenesCompra(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.ordenCompraService.getAllOrdenCompra().subscribe({
      next: (data: OrdenCompra[]) => {
        this.ordenesCompra = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al cargar ordenes de compra: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar órdenes de compra', err);
        this.isLoading = false;
      }
    });
  }

  selectOrdenCompra(orden: OrdenCompra): void {
    this.selectedOrdenCompra = orden;
  }
}
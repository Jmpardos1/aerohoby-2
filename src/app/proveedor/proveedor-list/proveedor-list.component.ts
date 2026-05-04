import { Component, OnInit } from '@angular/core';
import { Proveedor } from '../proveedor';
import { ProveedorDetail } from '../proveedor-detail';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedor-list',
  standalone: false,
  templateUrl: './proveedor-list.component.html',
  styleUrl: './proveedor-list.component.css',
})
export class ProveedorListComponent implements OnInit {
  proveedores: Proveedor[] = [];
  selectedProveedor: ProveedorDetail | null = null;
  isLoading: boolean = false;
  isDetailLoading: boolean = false;
  errorMessage: string = '';
  detailErrorMessage: string = '';

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.proveedorService.getProveedores().subscribe({
      next: (data: Proveedor[]) => {
        this.proveedores = data || [];
        this.isLoading = false;
      },
      error: (err: any) => {
        this.errorMessage = 'Error al cargar proveedores: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar proveedores', err);
        this.isLoading = false;
      }
    });
  }

  verDetalle(proveedor: Proveedor): void {
    if (!proveedor.id) {
      return;
    }

    this.isDetailLoading = true;
    this.detailErrorMessage = '';

    this.proveedorService.getProveedor(String(proveedor.id)).subscribe({
      next: (detail: ProveedorDetail) => {
        this.selectedProveedor = detail;
        this.isDetailLoading = false;
      },
      error: (err: any) => {
        this.detailErrorMessage = 'Error al cargar detalle del proveedor: ' + (err.message || 'Error desconocido');
        console.error('Error al cargar detalle del proveedor', err);
        this.isDetailLoading = false;
      }
    });
  }
}

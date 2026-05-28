import { Component, Input } from '@angular/core';
import { ProveedorDetail } from '../proveedor-detail';

@Component({
  selector: 'app-proveedor-detail',
  standalone: false,
  templateUrl: './proveedor-detail.component.html',
  styleUrl: './proveedor-detail.component.css',
})
export class ProveedorDetailComponent {
  @Input() proveedorDetail!: ProveedorDetail | null;
}

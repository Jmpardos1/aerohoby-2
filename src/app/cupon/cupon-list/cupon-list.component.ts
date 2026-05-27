import { Component, OnInit } from '@angular/core';
import { CuponService } from '../cupon.service';
import { Cupon } from '../cupon';

@Component({
  selector: 'app-cupon-list',
  standalone: false,
  templateUrl: './cupon-list.component.html',
  styleUrl: './cupon-list.component.css',
})
export class CuponListComponent implements OnInit {
  cupones: Cupon[] = [];
  codigoIngresado = '';
  cuponAplicado: Cupon | null = null;
  errorCodigo = '';

  constructor(private cuponService: CuponService) {}

  ngOnInit(): void {
    this.cuponService.getCupones().subscribe(c => this.cupones = c);
  }

  aplicarCodigo(): void {
    this.cuponAplicado = null;
    this.errorCodigo = '';
    const encontrado = this.cupones.find(
      c => c.codigoCupon.toLowerCase() === this.codigoIngresado.trim().toLowerCase()
    );
    if (!encontrado) {
      this.errorCodigo = 'Código no encontrado.';
      return;
    }
    if (new Date(encontrado.fechaVencimiento) < new Date()) {
      this.errorCodigo = 'Este cupón ya venció.';
      return;
    }
    this.cuponAplicado = encontrado;
  }

  esVigente(fecha: string): boolean {
    return new Date(fecha) >= new Date();
  }
}

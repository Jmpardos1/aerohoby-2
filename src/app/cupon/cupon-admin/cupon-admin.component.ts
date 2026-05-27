import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CuponService } from '../cupon.service';
import { OrdenCompraService } from '../../orden-compra/orden-compra-service';
import { Cupon } from '../cupon';
import { OrdenCompra } from '../../orden-compra/orden-compra';

@Component({
  selector: 'app-cupon-admin',
  standalone: false,
  templateUrl: './cupon-admin.component.html',
  styleUrl: './cupon-admin.component.css',
})
export class CuponAdminComponent implements OnInit {
  cupones: Cupon[] = [];
  ordenes: OrdenCompra[] = [];
  cuponForm!: FormGroup;
  errorMsg = '';
  successMsg = '';

  constructor(
    private cuponService: CuponService,
    private ordenService: OrdenCompraService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.cargarCupones();
    this.ordenService.getAllOrdenCompra().subscribe(o => this.ordenes = o);
    this.cuponForm = this.fb.group({
      codigoCupon:      ['', Validators.required],
      porcentaje:       ['', [Validators.required, Validators.min(1), Validators.max(100)]],
      fechaVencimiento: ['', Validators.required],
      ordenId:          ['']
    });
  }

  cargarCupones(): void {
    this.cuponService.getCupones().subscribe(c => this.cupones = c);
  }

  crearCupon(): void {
    if (this.cuponForm.invalid) return;
    this.errorMsg = '';
    this.successMsg = '';
    const { codigoCupon, porcentaje, fechaVencimiento, ordenId } = this.cuponForm.value;
    const payload: any = { codigoCupon, porcentaje: Number(porcentaje), fechaVencimiento };
    if (ordenId) payload.ordenId = ordenId;

    this.cuponService.createCupon(payload).subscribe({
      next: () => {
        this.successMsg = 'Cupón creado exitosamente.';
        this.cuponForm.reset();
        this.cargarCupones();
      },
      error: () => this.errorMsg = 'Error al crear el cupón.'
    });
  }

  eliminarCupon(id: string): void {
    this.cuponService.deleteCupon(id).subscribe(() => this.cargarCupones());
  }

  esVigente(fecha: string): boolean {
    return new Date(fecha) >= new Date();
  }
}

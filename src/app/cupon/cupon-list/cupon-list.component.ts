import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Cupon } from '../cupon';
import { CuponService } from '../cupon.service';

@Component({
  selector: 'app-cupon-list',
  standalone: false,
  templateUrl: './cupon-list.component.html',
  styleUrl: './cupon-list.component.css',
})
export class CuponListComponent implements OnInit {
  cupones: Cupon[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  private destroyRef = inject(DestroyRef);

  constructor(private cuponService: CuponService) {}

  ngOnInit(): void {
    this.loadCupones();
  }

  loadCupones(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.cuponService.getCupones()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data: Cupon[]) => {
          this.cupones = data;
          this.isLoading = false;
        },
        error: (err: any) => {
          this.errorMessage = 'Error al cargar cupones: ' + (err.message || 'Error desconocido');
          console.error('Error al cargar cupones', err);
          this.isLoading = false;
        }
      });
  }

  estaVencido(cupon: Cupon): boolean {
    return new Date(cupon.fechaVencimiento).getTime() < Date.now();
  }
}

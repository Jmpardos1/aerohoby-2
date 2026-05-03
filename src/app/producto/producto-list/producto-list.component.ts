import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-producto-list',
  standalone: false,
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.css',
})
export class ProductoListComponent implements OnInit {
  productos: Array<Producto> = [];

  private destroyRef = inject(DestroyRef);

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        this.productos = data;
      });
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

import { ProductoListComponent } from './producto-list.component';
import { ProductoDetailComponent } from '../producto-detail/producto-detail.component';
import { ProductoService } from '../producto.service';

describe('ProductoListComponent', () => {
  let component: ProductoListComponent;
  let fixture: ComponentFixture<ProductoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoListComponent, ProductoDetailComponent],
      imports: [FormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: PLATFORM_ID, useValue: 'browser' },
        {
          provide: ProductoService,
          useValue: { getProductos: () => of([]) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('filtra productos por precio máximo', () => {
    component.productos = [
      { id: 1, nombre: 'Producto barato', descripcion: '', precio: 1000, stock: 1, stockMinimo: 0, categoria: [], marca: null as any, imagen: '', proveedor: null as any },
      { id: 2, nombre: 'Producto costoso', descripcion: '', precio: 5000, stock: 1, stockMinimo: 0, categoria: [], marca: null as any, imagen: '', proveedor: null as any }
    ];
    component.precioMaximo = 2000;

    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].nombre).toBe('Producto barato');
  });

  it('filtra productos por categoría', () => {
    const categoriaBaterias = { id: 1, nombre: 'Baterias', descripcion: '' };
    const categoriaRepuestos = { id: 2, nombre: 'Repuestos', descripcion: '' };

    component.productos = [
      { id: 1, nombre: 'Ala', descripcion: '', precio: 1000, stock: 1, stockMinimo: 0, categoria: [categoriaRepuestos], marca: null as any, imagen: '', proveedor: null as any },
      { id: 2, nombre: 'Avion RC', descripcion: '', precio: 5000, stock: 1, stockMinimo: 0, categoria: [categoriaBaterias], marca: null as any, imagen: '', proveedor: null as any }
    ];
    component.seleccionarCategoria(categoriaBaterias.id);

    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].nombre).toBe('Avion RC');
  });
});

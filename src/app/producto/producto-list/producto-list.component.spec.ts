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

const mockProductos = [
  { id: 1, nombre: 'Ala', descripcion: '', precio: 1000, stock: 5, stockMinimo: 1,
    categoria: [{ id: 1, nombre: 'Repuestos', descripcion: '' }],
    marca: null as any, imagen: '', proveedor: null as any },
  { id: 2, nombre: 'Avion RC', descripcion: '', precio: 5000, stock: 3, stockMinimo: 1,
    categoria: [{ id: 2, nombre: 'Aviones', descripcion: '' }],
    marca: null as any, imagen: '', proveedor: null as any },
];

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
        { provide: ProductoService, useValue: { getProductos: () => of([]) } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('precioSliderMax redondea al múltiplo de 1000 del precio más alto', () => {
    component.productos = mockProductos;
    expect(component.precioSliderMax).toBe(5000);
  });

  it('sliderBackground genera el gradiente correcto al 50%', () => {
    component.productos = mockProductos;
    component.precioSlider = 2500;
    const bg = component.sliderBackground;
    expect(bg).toContain('linear-gradient');
    expect(bg).toContain('50%');
  });

  it('filtra productos por precio con el slider', () => {
    component.productos = mockProductos;
    component.precioSlider = 2000;
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].nombre).toBe('Ala');
  });

  it('filtra productos por categoría', () => {
    component.productos = mockProductos;
    component.precioSlider = component.precioSliderMax;
    component.seleccionarCategoria(2);
    expect(component.productosFiltrados.length).toBe(1);
    expect(component.productosFiltrados[0].nombre).toBe('Avion RC');
  });

  it('resetFiltros restaura el slider al máximo y limpia la categoría', () => {
    component.productos = mockProductos;
    component.precioSlider = 100;
    component.categoriaSeleccionadaId = 1;
    component.resetFiltros();
    expect(component.precioSlider).toBe(component.precioSliderMax);
    expect(component.categoriaSeleccionadaId).toBeNull();
  });

  it('mostrarCategorias alterna con alternarCategorias', () => {
    expect(component.mostrarCategorias).toBeFalse();
    component.alternarCategorias();
    expect(component.mostrarCategorias).toBeTrue();
    component.alternarCategorias();
    expect(component.mostrarCategorias).toBeFalse();
  });
});

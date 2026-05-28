import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CarritoService } from './carrito.service';
import { Producto } from '../producto/producto';

describe('CarritoService', () => {
  let service: CarritoService;

  const mockProducto = {
    id: 1, nombre: 'Propulsor X1', descripcion: 'Motor para drones',
    precio: 750, stock: 10, stockMinimo: 2,
    categoria: [], marca: null as any, imagen: '', proveedor: null as any
  } as Producto;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(CarritoService);
  });

  it('se deberia crear', () => {
    expect(service).toBeTruthy();
  });

  it('agregar agrega un nuevo item al carrito', () => {
    service.agregar(mockProducto);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].cantidad).toBe(1);
  });

  it('getCantidadTotal retorna la suma de todas las cantidades', () => {
    service.agregar(mockProducto);
    service.agregar(mockProducto);
    expect(service.getCantidadTotal()).toBe(2);
  });
});

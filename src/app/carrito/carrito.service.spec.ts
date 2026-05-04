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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('agregar agrega un nuevo item al carrito', () => {
    service.agregar(mockProducto);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].cantidad).toBe(1);
  });

  it('agregar incrementa la cantidad si el producto ya existe', () => {
    service.agregar(mockProducto);
    service.agregar(mockProducto);
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].cantidad).toBe(2);
  });

  it('quitar elimina el item del carrito', () => {
    service.agregar(mockProducto);
    service.quitar(String(mockProducto.id));
    expect(service.getItems().length).toBe(0);
  });

  it('actualizarCantidad cambia la cantidad del item', () => {
    service.agregar(mockProducto);
    service.actualizarCantidad(String(mockProducto.id), 5);
    expect(service.getItems()[0].cantidad).toBe(5);
  });

  it('vaciar limpia todos los items del carrito', () => {
    service.agregar(mockProducto);
    service.vaciar();
    expect(service.getItems().length).toBe(0);
  });

  it('getTotal retorna la suma de precio por cantidad', () => {
    service.agregar(mockProducto);
    service.agregar(mockProducto);
    expect(service.getTotal()).toBe(1500);
  });

  it('getCantidadTotal retorna la suma de todas las cantidades', () => {
    service.agregar(mockProducto);
    service.agregar(mockProducto);
    expect(service.getCantidadTotal()).toBe(2);
  });
});

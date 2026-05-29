import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { CarritoService } from './carrito.service';
import { Producto } from '../producto/producto';

describe('CarritoService', () => {
  let service: CarritoService;

  const mkProducto = (id: number, precio: number = 100): Producto =>
    ({ id, nombre: `P${id}`, descripcion: '', precio, stock: 10, stockMinimo: 1,
       categoria: [], marca: null as any, imagen: '', proveedor: null as any }) as Producto;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'browser' }]
    });
    service = TestBed.inject(CarritoService);
  });

  it('se deberia crear', () => expect(service).toBeTruthy());

  it('agregar agrega un nuevo item', () => {
    service.agregar(mkProducto(1));
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].cantidad).toBe(1);
  });

  it('agregar el mismo producto incrementa la cantidad', () => {
    service.agregar(mkProducto(1));
    service.agregar(mkProducto(1));
    expect(service.getItems().length).toBe(1);
    expect(service.getItems()[0].cantidad).toBe(2);
  });

  it('agregar varios productos distintos crea entradas separadas', () => {
    service.agregar(mkProducto(1));
    service.agregar(mkProducto(2));
    expect(service.getItems().length).toBe(2);
  });

  it('quitar elimina el item del carrito', () => {
    service.agregar(mkProducto(1));
    service.quitar('1');
    expect(service.getItems().length).toBe(0);
  });

  it('quitar un id inexistente no falla', () => {
    service.agregar(mkProducto(1));
    service.quitar('999');
    expect(service.getItems().length).toBe(1);
  });

  it('actualizarCantidad cambia la cantidad del item', () => {
    service.agregar(mkProducto(1));
    service.actualizarCantidad('1', 5);
    expect(service.getItems()[0].cantidad).toBe(5);
  });

  it('vaciar elimina todos los items', () => {
    service.agregar(mkProducto(1));
    service.agregar(mkProducto(2));
    service.vaciar();
    expect(service.getItems().length).toBe(0);
  });

  it('getTotal suma precio × cantidad de todos los items', () => {
    service.agregar(mkProducto(1, 200));
    service.agregar(mkProducto(1, 200));
    service.agregar(mkProducto(2, 300));
    expect(service.getTotal()).toBe(700);
  });

  it('getTotal retorna 0 cuando el carrito está vacío', () => {
    expect(service.getTotal()).toBe(0);
  });

  it('getCantidadTotal suma todas las cantidades', () => {
    service.agregar(mkProducto(1));
    service.agregar(mkProducto(1));
    service.agregar(mkProducto(2));
    expect(service.getCantidadTotal()).toBe(3);
  });

  it('getCantidadTotal retorna 0 con carrito vacío', () => {
    expect(service.getCantidadTotal()).toBe(0);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { OrdenCompraService } from './orden-compra-service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}ordenes-compra`;

const mockOrden = {
  id: 'o1', fechaOrden: new Date('2026-01-01'), estadoPedido: 'PAGADO',
  usuario: { id: 'u1', nombre: 'Ana', correo: 'a@b.com', telefono: '123', rol: 'CLIENT' },
  producto: { id: 'p1', nombre: 'Drone', descripcion: '', precio: 500, stock: 5, stockMinimo: 1, marca: 'DJI', proveedor: 'TechStore' }
};

describe('OrdenCompraService', () => {
  let service: OrdenCompraService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), OrdenCompraService]
    });
    service = TestBed.inject(OrdenCompraService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getAllOrdenCompra hace GET y normaliza array', () => {
    service.getAllOrdenCompra().subscribe(r => expect(r).toEqual([mockOrden]));
    http.expectOne(BASE).flush([mockOrden]);
  });

  it('getAllOrdenCompra normaliza respuesta paginada', () => {
    service.getAllOrdenCompra().subscribe(r => expect(r).toEqual([mockOrden]));
    http.expectOne(BASE).flush({ content: [mockOrden] });
  });

  it('getAllOrdenCompra normaliza respuesta vacía', () => {
    service.getAllOrdenCompra().subscribe(r => expect(r).toEqual([]));
    http.expectOne(BASE).flush({ content: [] });
  });

  it('getOrdenCompra hace GET a /ordenes-compra/:id', () => {
    service.getOrdenCompra('o1').subscribe(r => expect(r).toEqual(mockOrden as any));
    const req = http.expectOne(`${BASE}/o1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrden);
  });

  it('createOrdenCompra hace POST con los datos', () => {
    const payload = { fechaOrden: new Date(), estadoPedido: 'PAGADO', usuarioId: 'u1', productoId: 'p1' };
    service.createOrdenCompra(payload).subscribe(r => expect(r).toEqual(mockOrden as any));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    req.flush(mockOrden);
  });

  it('deleteOrdenCompra hace DELETE a /ordenes-compra/:id', () => {
    service.deleteOrdenCompra('o1').subscribe();
    const req = http.expectOne(`${BASE}/o1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('updateEstado hace PATCH a /ordenes-compra/:id/estado', () => {
    service.updateEstado('o1', 'CANCELADO').subscribe(r => expect(r).toEqual(mockOrden as any));
    const req = http.expectOne(`${BASE}/o1/estado`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ estadoPedido: 'CANCELADO' });
    req.flush(mockOrden);
  });
});

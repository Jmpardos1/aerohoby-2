import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { OrdenCompraService } from './orden-compra-service';
import { environment } from '../../environments/environment.development';
import { OrdenCompra } from './orden-compra';
import { Usuario } from './usuario';
import { Producto } from './producto';
import { faker } from '@faker-js/faker';


describe('OrdenCompraService', () => {
  let service: OrdenCompraService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}ordenes-compra`;

  const mockUsuario: Usuario = {
    id: faker.string.uuid() as any,
    nombre: faker.person.fullName(),
    correo: faker.internet.email(),
    telefono: faker.phone.number(),
    rol: 'CLIENTE'
  };

  const mockProducto: Producto = {
    id: faker.string.uuid() as any,
    nombre: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    precio: faker.number.int({ min: 1000, max: 5000 }),
    stock: faker.number.int({ min: 10, max: 100 }),
    stockMinimo: faker.number.int({ min: 1, max: 5 }),
    marca: faker.company.name(),
    proveedor: faker.company.name()
  };

  const mockOrdenCompra: OrdenCompra = {
    id: faker.string.uuid() as any,
    fechaOrden: faker.date.past(),
    estadoPedido: 'ENTREGADO',
    usuario: mockUsuario,
    producto: mockProducto
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OrdenCompraService]
    });

    service = TestBed.inject(OrdenCompraService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todas las ordenes', () => {
    const mockOrdenes = [mockOrdenCompra];

    service.getAllOrdenCompra().subscribe((result) => {
      expect(result).toEqual(mockOrdenes);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrdenes);
  });

  it('debe crear una orden y devolverla', () => {
    const newOrden = {
      fechaOrden: faker.date.recent(),
      estadoPedido: 'PENDIENTE',
      usuarioId: mockUsuario.id,
      productoId: mockProducto.id
    };

    service.createOrdenCompra(newOrden).subscribe((result) => {
      expect(result).toEqual(mockOrdenCompra);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockOrdenCompra);
  });

  it('Traer una orden por ID', () => {
    const orderId = 'order-1';

    service.getOrdenCompra(orderId).subscribe((result) => {
      expect(result).toEqual(mockOrdenCompra);
    });

    const req = httpMock.expectOne(`${apiUrl}/${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrdenCompra);
  });

  it('Eliminar una orden por ID', () => {
    const orderId = 'order-1';

    service.deleteOrdenCompra(orderId).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/${orderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('Eliminar ordenes por cliente', () => {
    const clientId = 'user-1';

    service.deleteOrdenCompraCliente(clientId).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/cliente/${clientId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('Eliminar ordenes por fecha', () => {
    const date = faker.date.past().toISOString().split('T')[0];

    service.deleteOrdenCompraFecha(date).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/fecha?fecha=${date}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

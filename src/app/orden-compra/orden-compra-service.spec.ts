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


  it('Traer una orden por ID', () => {
    const orderId = 'order-1';

    service.getOrdenCompra(orderId).subscribe((result) => {
      expect(result).toEqual(mockOrdenCompra);
    });

    const req = httpMock.expectOne(`${apiUrl}/${orderId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockOrdenCompra);
  });

});

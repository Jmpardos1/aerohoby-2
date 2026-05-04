import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { InventarioService } from './inventario-service';
import { environment } from '../../environments/environment.development';
import { Inventario } from './inventario';
import { Producto } from '../orden-compra/producto';
import { faker } from '@faker-js/faker';

describe('InventarioService', () => {
  let service: InventarioService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}inventarios`;

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

  const mockInventario: Inventario = {
    id: faker.string.uuid() as any,
    producto: mockProducto,
    cantidad: faker.number.int({ min: 1, max: 50 }),
    tipoMovimiento: 'ENTRADA',
    fecha: faker.date.past(),
    descripcion: faker.lorem.sentence()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InventarioService]
    });
    service = TestBed.inject(InventarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todos los inventarios', () => {
    const mockList = [mockInventario];

    service.getAllInventarios().subscribe(result => {
      expect(result).toEqual(mockList);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockList);
  });

  it('Debe traer un inventario por ID', () => {
    const id = 'inv-1';

    service.getInventario(id).subscribe(result => {
      expect(result).toEqual(mockInventario);
    });

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInventario);
  });

  it('Debe traer inventarios por producto', () => {
    const productoId = 'prod-1';

    service.getInventarioByProducto(productoId).subscribe(result => {
      expect(result).toEqual([mockInventario]);
    });

    const req = httpMock.expectOne(`${apiUrl}/producto/${productoId}`);
    expect(req.request.method).toBe('GET');
    req.flush([mockInventario]);
  });

  it('Debe crear un inventario', () => {
    const newInv = {
      productoId: mockProducto.id,
      cantidad: 10,
      tipoMovimiento: 'ENTRADA',
      fecha: new Date(),
      descripcion: 'Reposición de stock'
    };

    service.createInventario(newInv).subscribe(result => {
      expect(result).toEqual(mockInventario);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(mockInventario);
  });

  it('Debe eliminar un inventario por ID', () => {
    const id = 'inv-1';

    service.deleteInventario(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProveedorService } from './proveedor.service';
import { environment } from '../../environments/environment.development';

describe('ProveedorService', () => {
  let service: ProveedorService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}proveedores`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProveedorService]
    });

    service = TestBed.inject(ProveedorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todos los proveedores', () => {
    const mockProveedores = [
      { id: '1', nombre: 'RC Parts', direccion: 'Calle 1', correo: 'rc@test.com', telefono: 123456 }
    ];

    service.getProveedores().subscribe((proveedores) => {
      expect(proveedores).toEqual(mockProveedores);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProveedores);
  });

  it('Debe traer el detalle de un proveedor', () => {
    const mockProveedor = {
      id: '1',
      nombre: 'RC Parts',
      direccion: 'Calle 1',
      correo: 'rc@test.com',
      telefono: 123456,
      productos: [
        { id: 'p1', nombre: 'Bateria LiPo', descripcion: '11.1V', precio: 100, stock: 8, stockMinimo: 2 }
      ]
    };

    service.getProveedor('1').subscribe((proveedor) => {
      expect(proveedor).toEqual(mockProveedor);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProveedor);
  });
});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProveedorService } from './proveedor.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}proveedores`;

const mockProveedor = { id: 'pr1', nombre: 'RC Parts', direccion: 'Calle 1', correo: 'rc@test.com', telefono: 123456 };

describe('ProveedorService', () => {
  let service: ProveedorService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProveedorService]
    });
    service = TestBed.inject(ProveedorService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getProveedores hace GET a /proveedores', () => {
    service.getProveedores().subscribe(r => expect(r).toEqual([mockProveedor]));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([mockProveedor]);
  });

  it('getProveedor hace GET a /proveedores/:id', () => {
    service.getProveedor('pr1').subscribe();
    const req = http.expectOne(`${BASE}/pr1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProveedor);
  });

  it('createProveedor hace POST con los datos', () => {
    const data = { nombre: 'Nuevo', correo: 'n@t.com', telefono: 999, direccion: 'Av 2' };
    service.createProveedor(data).subscribe(r => expect(r).toEqual(mockProveedor as any));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(mockProveedor);
  });

  it('deleteProveedor hace DELETE a /proveedores/:id', () => {
    service.deleteProveedor('pr1').subscribe();
    const req = http.expectOne(`${BASE}/pr1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

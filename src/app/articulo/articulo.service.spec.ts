import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ArticuloService } from './articulo.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}articulos`;

const mockArticulo = {
  id: 'a1', titulo: 'Guia baterias', descripcion: 'Tips', contenido: 'Contenido',
  fechaPublicacion: '2026-05-01',
  autor: { id: 'u1', nombre: 'Experto', correo: 'e@test.com', telefono: '123', rol: 'EXPERT' },
  productos: []
};

describe('ArticuloService', () => {
  let service: ArticuloService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ArticuloService]
    });
    service = TestBed.inject(ArticuloService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getArticulos hace GET a /articulos', () => {
    service.getArticulos().subscribe(r => expect(r).toEqual([mockArticulo]));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([mockArticulo]);
  });

  it('getArticuloDetail hace GET a /articulos/:id/detail', () => {
    service.getArticuloDetail('a1').subscribe(r => expect(r).toEqual(mockArticulo as any));
    const req = http.expectOne(`${BASE}/a1/detail`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticulo);
  });

  it('getArticulosPorProducto hace GET con query params', () => {
    service.getArticulosPorProducto(42, 1, 10).subscribe();
    const req = http.expectOne(r => r.url === `${BASE}/producto/42`);
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('page')).toBe('1');
    expect(req.request.params.get('size')).toBe('10');
    req.flush([]);
  });

  it('getArticulosPorProducto usa defaults page=0 size=100', () => {
    service.getArticulosPorProducto(5).subscribe();
    const req = http.expectOne(r => r.url === `${BASE}/producto/5`);
    expect(req.request.params.get('page')).toBe('0');
    expect(req.request.params.get('size')).toBe('100');
    req.flush([]);
  });

  it('createArticulo hace POST con los datos correctos', () => {
    const payload = { titulo: 'T', descripcion: 'D', contenido: 'C', fechaPublicacion: '2026-01-01', autorId: 'u1' };
    service.createArticulo(payload).subscribe(r => expect(r).toEqual(mockArticulo as any));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockArticulo);
  });

  it('addProducto hace POST a /articulos/:id/productos/:pid', () => {
    service.addProducto('a1', 'p1').subscribe();
    const req = http.expectOne(`${BASE}/a1/productos/p1`);
    expect(req.request.method).toBe('POST');
    req.flush({});
  });
});

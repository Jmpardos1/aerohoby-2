import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { CuponService } from './cupon.service';
import { environment } from '../../environments/environment.development';
import { Cupon } from './cupon';

const BASE = `${environment.baseUrl}cupones`;

const mockCupon: Cupon = {
  id: 'c1', codigoCupon: 'PROMO10', porcentaje: 10,
  fechaVencimiento: '2026-12-31T23:59:59', ordenCompra: null
};

describe('CuponService', () => {
  let service: CuponService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), CuponService]
    });
    service = TestBed.inject(CuponService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getCupones hace GET y normaliza array', () => {
    service.getCupones().subscribe(r => expect(r).toEqual([mockCupon]));
    http.expectOne(BASE).flush([mockCupon]);
  });

  it('getCupones normaliza respuesta paginada', () => {
    service.getCupones().subscribe(r => expect(r).toEqual([mockCupon]));
    http.expectOne(BASE).flush({ content: [mockCupon] });
  });

  it('getCupon hace GET a /cupones/:id', () => {
    service.getCupon('c1').subscribe(r => expect(r).toEqual(mockCupon));
    const req = http.expectOne(`${BASE}/c1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCupon);
  });

  it('createCupon hace POST con el payload correcto', () => {
    const payload = { codigoCupon: 'NEW10', porcentaje: 10, fechaVencimiento: '2027-01-01T00:00:00' };
    service.createCupon(payload).subscribe(r => expect(r).toEqual(mockCupon));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(payload);
    req.flush(mockCupon);
  });

  it('updateCupon hace PUT a /cupones/:id', () => {
    const changes = { porcentaje: 20 };
    service.updateCupon('c1', changes).subscribe(r => expect(r).toEqual(mockCupon));
    const req = http.expectOne(`${BASE}/c1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(changes);
    req.flush(mockCupon);
  });

  it('deleteCupon hace DELETE a /cupones/:id', () => {
    service.deleteCupon('c1').subscribe();
    const req = http.expectOne(`${BASE}/c1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

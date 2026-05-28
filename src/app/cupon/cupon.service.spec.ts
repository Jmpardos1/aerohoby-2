import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CuponService } from './cupon.service';
import { environment } from '../../environments/environment.development';
import { Cupon } from './cupon';

describe('CuponService', () => {
  let service: CuponService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}cupones`;

  const mockCupon: Cupon = {
    id: faker.string.uuid(),
    codigoCupon: 'PROMO10',
    porcentaje: 10,
    fechaVencimiento: '2026-12-31T23:59:59',
    ordenCompra: null
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CuponService]
    });

    service = TestBed.inject(CuponService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todos los cupones', () => {
    service.getCupones().subscribe((cupones) => {
      expect(cupones).toEqual([mockCupon]);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush([mockCupon]);
  });

  it('Debe traer un cupon por id', () => {
    service.getCupon(mockCupon.id).subscribe((cupon) => {
      expect(cupon).toEqual(mockCupon);
    });

    const req = httpMock.expectOne(`${apiUrl}/${mockCupon.id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCupon);
  });

  it('Debe crear un cupon', () => {
    const nuevoCupon = {
      codigoCupon: 'PROMO15',
      porcentaje: 15,
      fechaVencimiento: '2026-11-01T12:00:00'
    };

    service.createCupon(nuevoCupon).subscribe((cupon) => {
      expect(cupon).toEqual(mockCupon);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(nuevoCupon);
    req.flush(mockCupon);
  });

});

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { MarcaService } from './marca.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}marcas`;

const mockMarca = { id: 1, nombre: 'DJI', descripcion: 'Líder en drones' };

describe('MarcaService', () => {
  let service: MarcaService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(MarcaService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getMarcas hace GET a /marcas', () => {
    service.getMarcas().subscribe(r => expect(r).toEqual([mockMarca]));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([mockMarca]);
  });

  it('createMarca hace POST con nombre y descripcion', () => {
    const data = { nombre: 'Nueva', descripcion: 'Desc' };
    service.createMarca(data).subscribe(r => expect(r).toEqual(mockMarca as any));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(data);
    req.flush(mockMarca);
  });

  it('deleteMarca hace DELETE a /marcas/:id', () => {
    service.deleteMarca('m1').subscribe();
    const req = http.expectOne(`${BASE}/m1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});

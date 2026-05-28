import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { environment } from '../../environments/environment.development';

const BASE = environment.baseUrl + 'reviews';

describe('ReviewService', () => {
  let service: ReviewService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(ReviewService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('getReviews hace GET a /reviews', () => {
    service.getReviews().subscribe();
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('createReview hace POST con productoId en el cuerpo', () => {
    const data = {
      puntuacion: 5,
      fecha: '2026-05-26',
      contenido: 'Excelente',
      usuarioId: 'u1',
      productoId: 'p1'
    };
    service.createReview(data).subscribe();
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.productoId).toBe('p1');
    expect(req.request.body.usuarioId).toBe('u1');
    req.flush({});
  });
});

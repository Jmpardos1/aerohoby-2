import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ReviewService } from './review.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}reviews`;

const mockReview = {
  id: 'r1', puntuacion: 5, fecha: '2026-05-01',
  contenido: 'Excelente', usuarioId: 'u1', productoId: 'p1'
};

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

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getReviews hace GET a /reviews', () => {
    service.getReviews().subscribe(r => expect(r).toEqual([mockReview]));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([mockReview]);
  });

  it('getReviewById hace GET a /reviews/:id', () => {
    service.getReviewById('r1').subscribe(r => expect(r).toEqual(mockReview as any));
    const req = http.expectOne(`${BASE}/r1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReview);
  });

  it('getReviewsByProducto hace GET y normaliza array', () => {
    service.getReviewsByProducto('p1').subscribe(r => expect(r).toEqual([mockReview]));
    const req = http.expectOne(`${BASE}/producto/p1`);
    expect(req.request.method).toBe('GET');
    req.flush([mockReview]);
  });

  it('getReviewsByProducto normaliza respuesta paginada', () => {
    service.getReviewsByProducto('p1').subscribe(r => expect(r).toEqual([mockReview]));
    http.expectOne(`${BASE}/producto/p1`).flush({ content: [mockReview] });
  });

  it('createReview hace POST con el cuerpo correcto', () => {
    const data = { puntuacion: 4, fecha: '2026-05-10', contenido: 'Bueno', usuarioId: 'u1', productoId: 'p1' };
    service.createReview(data).subscribe();
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.puntuacion).toBe(4);
    expect(req.request.body.productoId).toBe('p1');
    req.flush(mockReview);
  });
});

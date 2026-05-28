import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Review } from './review';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private readonly apiUrl = environment.baseUrl + 'reviews';

  constructor(private http: HttpClient) {}

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(this.apiUrl);
  }

  getReviewById(id: string): Observable<Review> {
    return this.http.get<Review>(`${this.apiUrl}/${id}`);
  }

  getReviewsByProducto(productoId: string): Observable<Review[]> {
    return this.http.get<any>(`${this.apiUrl}/producto/${productoId}`).pipe(
      map(res => Array.isArray(res) ? res : (res?.content ?? []))
    );
  }

  createReview(data: {
    puntuacion: number;
    fecha: string;
    contenido: string;
    usuarioId: string;
    productoId: string;
  }): Observable<Review> {
    return this.http.post<Review>(this.apiUrl, data);
  }
}

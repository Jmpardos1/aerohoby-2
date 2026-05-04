import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Cupon } from './cupon';

@Injectable({
  providedIn: 'root'
})
export class CuponService {
  private apiUrl = `${environment.baseUrl}cupones`;

  constructor(private http: HttpClient) {}

  getCupones(): Observable<Cupon[]> {
    return this.http.get<Cupon[]>(this.apiUrl);
  }

  getCupon(id: string): Observable<Cupon> {
    return this.http.get<Cupon>(`${this.apiUrl}/${id}`);
  }

  createCupon(cupon: {
    codigoCupon: string;
    porcentaje: number;
    fechaVencimiento: string;
  }): Observable<Cupon> {
    return this.http.post<Cupon>(this.apiUrl, cupon);
  }

  updateCupon(
    id: string,
    cupon: Partial<{
      codigoCupon: string;
      porcentaje: number;
      fechaVencimiento: string;
    }>
  ): Observable<Cupon> {
    return this.http.put<Cupon>(`${this.apiUrl}/${id}`, cupon);
  }

  deleteCupon(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

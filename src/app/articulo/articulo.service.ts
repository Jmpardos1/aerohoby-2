import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Articulo } from './articulo';
import { ArticuloDetail } from './articulo-detail';

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = `${environment.baseUrl}articulos`;

  constructor(private http: HttpClient) {}

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticuloDetail(id: string): Observable<ArticuloDetail> {
    return this.http.get<ArticuloDetail>(`${this.apiUrl}/${id}/detail`);
  }
}

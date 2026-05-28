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

  getArticulosPorProducto(productoId: number, page = 0, size = 100): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.apiUrl}/producto/${productoId}`, {
      params: { page: page.toString(), size: size.toString() }
    });
  }

  createArticulo(data: {
    titulo: string; descripcion: string; contenido: string;
    fechaPublicacion: string; autorId: string;
  }): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, data);
  }

  addProducto(articuloId: string, productoId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${articuloId}/productos/${productoId}`, {});
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Articulo, Comentario } from './articulo';

@Injectable({ providedIn: 'root' })
export class ArticuloService {
  private readonly apiUrl = environment.baseUrl + 'articulos';

  constructor(private readonly http: HttpClient) {}

  getArticulos(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  getArticulo(id: string): Observable<Articulo> {
    return this.http.get<Articulo>(`${this.apiUrl}/${id}`);
  }

  createArticulo(data: { titulo: string; descripcion: string; contenido: string; fechaPublicacion: string; autorId: string }): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, data);
  }

  deleteArticulo(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getComentarios(articuloId: string): Observable<Comentario[]> {
    return this.http.get<Comentario[]>(`${this.apiUrl}/${articuloId}/comentarios`);
  }

  createComentario(articuloId: string, data: { contenido: string; autorId: string }): Observable<Comentario> {
    return this.http.post<Comentario>(`${this.apiUrl}/${articuloId}/comentarios`, data);
  }

  deleteComentario(articuloId: string, comentarioId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${articuloId}/comentarios/${comentarioId}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Categoria } from './categoria';

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private readonly apiUrl = environment.baseUrl + 'categorias';

  constructor(private readonly http: HttpClient) {}

  getCategorias(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  createCategoria(data: { nombre: string; descripcion: string }): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, data);
  }

  deleteCategoria(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

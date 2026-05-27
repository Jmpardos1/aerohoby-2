import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Marca } from './marca';

@Injectable({ providedIn: 'root' })
export class MarcaService {
  private readonly apiUrl = environment.baseUrl + 'marcas';

  constructor(private readonly http: HttpClient) {}

  getMarcas(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.apiUrl);
  }

  createMarca(data: { nombre: string; descripcion: string }): Observable<Marca> {
    return this.http.post<Marca>(this.apiUrl, data);
  }

  deleteMarca(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

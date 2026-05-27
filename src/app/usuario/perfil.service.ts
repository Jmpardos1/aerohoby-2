import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Usuario } from '../usuario/usuario';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private readonly apiUrl: string = environment.baseUrl + 'usuarios';

  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getPerfil(userId: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + '/' + userId);
  }

  updatePerfil(userId: string, perfilData: Partial<Usuario>): Observable<Usuario> {
    return this.http.put<Usuario>(this.apiUrl + '/' + userId, perfilData);
  }

  cambiarRol(userId: string, rol: string): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${userId}/rol`, { rol });
  }
}

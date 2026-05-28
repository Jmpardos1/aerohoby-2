import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

const KEYS = {
  token: 'token',
  rol: 'rol',
  nombre: 'nombre',
  uid: 'uid',
} as const;

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {}

  login(correo: string, password: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/login', { correo, password }).pipe(
      tap((res: any) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(KEYS.token, res.token);
          localStorage.setItem(KEYS.rol, res.rol);
          localStorage.setItem(KEYS.nombre, res.nombre);
          localStorage.setItem(KEYS.uid, res.id);
        }
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }
  }

  register(nombre: string, correo: string, telefono: string, password: string, rol: string): Observable<any> {
    return this.http.post(environment.baseUrl + 'auth/register', { nombre, correo, telefono, password, rol });
  }

  recuperarContrasena(correo: string, nuevaPassword: string): Observable<void> {
    return this.http.post<void>(environment.baseUrl + 'auth/recuperar-contrasena', { correo, nuevaPassword });
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(KEYS.token);
  }

  getRol(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(KEYS.rol);
  }

  getNombre(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    return localStorage.getItem(KEYS.nombre);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}

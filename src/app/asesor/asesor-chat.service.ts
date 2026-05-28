import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface AsesorProducto {
  id: string;
  nombre: string;
  descripcion: string;
  imagenUrl: string;
  precio: number;
  stock: number;
  link: string;
}

export interface AsesorArticulo {
  id: string;
  titulo: string;
  descripcion: string;
  autor: string;
  fechaPublicacion: string;
  link: string;
}

export interface AsesorChatResponse {
  respuesta: string;
  modo: string;
  productos: AsesorProducto[];
  articulos: AsesorArticulo[];
}

@Injectable({ providedIn: 'root' })
export class AsesorChatService {
  private readonly apiUrl = environment.baseUrl + 'asesor/chat';

  widgetAbierto = signal(false);
  abrirWidget() { this.widgetAbierto.set(true); }
  cerrarWidget() { this.widgetAbierto.set(false); }
  toggleWidget() { this.widgetAbierto.update(v => !v); }

  constructor(private http: HttpClient) {}

  enviarMensaje(mensaje: string): Observable<AsesorChatResponse> {
    return this.http.post<AsesorChatResponse>(this.apiUrl, { mensaje });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Proveedor } from './proveedor';
import { ProveedorDetail } from './proveedor-detail';

export interface ProveedorItem {
  id?: any;
  nombre: string;
  correo?: string;
  telefono?: string | number;
  direccion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {
  private apiUrl = `${environment.baseUrl}proveedores`;

  constructor(private http: HttpClient) {}

  getProveedores(): Observable<Proveedor[]> {
    return this.http.get<Proveedor[]>(this.apiUrl);
  }

  getProveedor(id: string): Observable<ProveedorDetail> {
    return this.http.get<ProveedorDetail>(`${this.apiUrl}/${id}`);
  }

  createProveedor(data: { nombre: string; correo: string; telefono: number; direccion: string }): Observable<Proveedor> {
    return this.http.post<Proveedor>(this.apiUrl, data);
  }

  deleteProveedor(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

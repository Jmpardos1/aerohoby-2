import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Proveedor } from './proveedor';
import { ProveedorDetail } from './proveedor-detail';

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
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

export interface ProveedorItem { id: string; nombre: string; }

@Injectable({ providedIn: 'root' })
export class ProveedorService {
  private readonly apiUrl = environment.baseUrl + 'proveedores';

  constructor(private readonly http: HttpClient) {}

  getProveedores(): Observable<ProveedorItem[]> {
    return this.http.get<ProveedorItem[]>(this.apiUrl);
  }
}

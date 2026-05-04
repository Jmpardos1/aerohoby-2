import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Inventario } from './inventario';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = `${environment.baseUrl}inventarios`;
  private inventariosList: Inventario[] = [];

  constructor(private http: HttpClient) {}

  getAllInventarios(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(this.apiUrl).pipe(
      tap(data => this.inventariosList = data)
    );
  }

  getInventario(id: string): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.apiUrl}/${id}`);
  }

  getInventarioByProducto(productoId: string): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${this.apiUrl}/producto/${productoId}`);
  }

  createInventario(inventario: {
    productoId: string;
    cantidad: number;
    tipoMovimiento: string;
    fecha: Date;
    descripcion: string;
  }): Observable<Inventario> {
    return this.http.post<Inventario>(this.apiUrl, inventario);
  }

  deleteInventario(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { OrdenCompra } from './orden-compra';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrdenCompraService {
  private apiUrl = `${environment.baseUrl}ordenes-compra`;
  private ordenesCompraList: OrdenCompra[] = [];

  constructor(private http: HttpClient) {}

  createOrdenCompra(ordenCompra: { fechaOrden: Date; estadoPedido: string; usuarioId: string; productoId: string }): Observable<OrdenCompra> {
    return this.http.post<OrdenCompra>(this.apiUrl, ordenCompra);
  }

  getOrdenCompra(id: string): Observable<OrdenCompra> {
    return this.http.get<OrdenCompra>(`${this.apiUrl}/${id}`);
  }

  getAllOrdenCompra(): Observable<OrdenCompra[]> {
    return this.http.get<OrdenCompra[]>(this.apiUrl).pipe(
      tap(data => this.ordenesCompraList = data)
    );
  }

  deleteOrdenCompra(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  deleteOrdenCompraCliente(clienteId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  deleteOrdenCompraFecha(fecha: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/fecha?fecha=${fecha}`);
  }
}
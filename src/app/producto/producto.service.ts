import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Producto } from './producto';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly apiUrl = environment.baseUrl + 'productos';

  constructor(private readonly http: HttpClient) {}

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  createProducto(data: { nombre: string; descripcion: string; precio: number; stock: number; stockMinimo: number; marcaId: string; proveedorId: string }): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, data);
  }

  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateNombre(id: string, nombre: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/nombre`, { nombre });
  }

  updateDescripcion(id: string, descripcion: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/descripcion`, { descripcion });
  }

  updatePrecio(id: string, precio: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/precio`, { precio });
  }

  updateStock(id: string, stock: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/stock`, { stock });
  }

  updateStockMinimo(id: string, stockMinimo: number): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/stockMinimo`, { stockMinimo });
  }

  addCategoria(productoId: string, categoriaId: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${productoId}/categoria/${categoriaId}`, {});
  }

  removeCategoria(productoId: string, categoriaId: string): Observable<Producto> {
    return this.http.delete<Producto>(`${this.apiUrl}/${productoId}/categoria/${categoriaId}`);
  }
}


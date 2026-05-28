import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { forkJoin, map, Observable } from 'rxjs';
import { Producto } from './producto';
import { Categoria } from '../categoria/categoria';
import { CategoriaService } from '../categoria/categoria.service';

interface ProductoApiResponse {
  id: string | number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  marca?: Producto['marca'];
  proveedor?: Producto['proveedor'];
}

interface CategoriaApiResponse {
  id: string | number;
  nombre: string;
  descripcion: string;
  productos?: Array<{
    id: string | number;
  }>;
}

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly apiUrl = environment.baseUrl + 'productos';

  constructor(
    private http: HttpClient,
    private categoriaService: CategoriaService
  ) {}

  createProducto(data: Partial<Producto> & { marcaId?: string; proveedorId?: string }): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, data);
  }

  getProducto(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  updateNombre(id: string, nombre: string): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/nombre`, { nombre });
  }

  updateDescripcion(id: string, descripcion: string): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/descripcion`, { descripcion });
  }

  updatePrecio(id: string, precio: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/precio`, { precio });
  }

  updateStock(id: string, stock: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/stock`, { stock });
  }

  updateStockMinimo(id: string, stockMinimo: number): Observable<Producto> {
    return this.http.patch<Producto>(`${this.apiUrl}/${id}/stockMinimo`, { stockMinimo });
  }

  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCategoria(productoId: string, categoriaId: string): Observable<Producto> {
    return this.http.post<Producto>(`${this.apiUrl}/${productoId}/categorias/${categoriaId}`, {});
  }

  getProductos(): Observable<Producto[]> {
    return forkJoin({
      productos: this.http.get<ProductoApiResponse[]>(this.apiUrl),
      categorias: this.categoriaService.getCategorias() as Observable<CategoriaApiResponse[]>,
    }).pipe(
      map(({ productos, categorias }) =>
        productos.map((producto) => this.mapProducto(producto, categorias))
      )
    );
  }

  private mapProducto(
    producto: ProductoApiResponse,
    categorias: CategoriaApiResponse[]
  ): Producto {
    const categoriasDelProducto = categorias
      .filter((categoria) =>
        categoria.productos?.some((productoCategoria) => productoCategoria.id === producto.id)
      )
      .map((categoria) => this.mapCategoria(categoria));

    return {
      id: producto.id as number,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      stockMinimo: producto.stockMinimo,
      categoria: categoriasDelProducto,
      marca: producto.marca ?? ({ id: 0, nombre: 'Sin marca', descripcion: '' } as Producto['marca']),
      imagen: '',
      proveedor: producto.proveedor ?? {
        nombre: 'Sin proveedor',
        direccion: '',
        correo: '',
        telefono: '',
      },
    };
  }

  private mapCategoria(categoria: CategoriaApiResponse): Categoria {
    return {
      id: categoria.id as number,
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
    };
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { map, Observable } from 'rxjs';
import { Producto } from './producto';
import { Categoria } from '../categoria/categoria';

interface ProductoApiResponse {
  id: string | number;
  nombre: string;
  descripcion: string;
  imagenUrl?: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  categorias?: CategoriaApiResponse[];
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

  constructor(private http: HttpClient) {}

  createProducto(data: Partial<Producto> & { marcaId?: string; proveedorId?: string; imagenUrl?: string }): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, {
      ...data,
      imagenUrl: data.imagenUrl ?? data.imagen ?? '',
    });
  }

  getProducto(id: string): Observable<Producto> {
    return this.http
      .get<ProductoApiResponse>(`${this.apiUrl}/${id}`)
      .pipe(map((producto) => this.mapProducto(producto)));
  }

  updateNombre(id: string, nombre: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/nombre`, { nombre });
  }

  updateDescripcion(id: string, descripcion: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/descripcion`, { descripcion });
  }

  updateImagenUrl(id: string, imagenUrl: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}/imagenUrl`, { imagenUrl });
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

  deleteProducto(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addCategoria(productoId: string, categoriaId: string): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${productoId}/categoria/${categoriaId}`, {});
  }

  getProductos(): Observable<Producto[]> {
    return this.http
      .get<ProductoApiResponse[]>(this.apiUrl)
      .pipe(map((productos) => productos.map((producto) => this.mapProducto(producto))));
  }

  private mapProducto(producto: ProductoApiResponse): Producto {
    const categoriasDelProducto = (producto.categorias ?? []).map((categoria) => this.mapCategoria(categoria));

    return {
      id: producto.id as number,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precio: producto.precio,
      stock: producto.stock,
      stockMinimo: producto.stockMinimo,
      categoria: categoriasDelProducto,
      marca: producto.marca ?? ({ id: 0, nombre: 'Sin marca', descripcion: '' } as Producto['marca']),
      imagen: producto.imagenUrl ?? '',
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


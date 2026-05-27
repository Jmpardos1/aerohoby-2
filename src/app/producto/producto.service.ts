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
      proveedor: producto.proveedor ?? ({
        nombre: 'Sin proveedor',
        direccion: '',
        correo: '',
        telefono: '',
      } as Producto['proveedor']),
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


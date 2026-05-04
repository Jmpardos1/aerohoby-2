import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { ProductoService } from './producto.service';
import { environment } from '../../environments/environment.development';
import { CategoriaService } from '../categoria/categoria.service';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpMock: HttpTestingController;
  const productosUrl = `${environment.baseUrl}productos`;
  const categoriasUrl = `${environment.baseUrl}categorias`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductoService, CategoriaService]
    });

    service = TestBed.inject(ProductoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products enriched with categories', () => {
    const productoId = faker.string.uuid();
    const categoriaId = faker.string.uuid();

    const productosResponse = [
      {
        id: productoId,
        nombre: 'Avion RC',
        descripcion: 'Producto de prueba',
        precio: 5000,
        stock: 12,
        stockMinimo: 3,
        marca: {
          id: faker.string.uuid(),
          nombre: 'Hobby Pro',
          descripcion: 'Marca de prueba',
        },
        proveedor: {
          id: faker.string.uuid(),
          nombre: 'Proveedor Uno',
          direccion: 'Calle 1',
          correo: 'proveedor@correo.com',
          telefono: '3000000000',
        },
      },
    ];

    const categoriasResponse = [
      {
        id: categoriaId,
        nombre: 'Aviones',
        descripcion: 'Categoria de vuelo',
        productos: [{ id: productoId }],
      },
    ];

    service.getProductos().subscribe((productos) => {
      expect(productos.length).toBe(1);
      expect(productos[0].nombre).toBe('Avion RC');
      expect(productos[0].categoria).toEqual([
        {
          id: categoriaId as any,
          nombre: 'Aviones',
          descripcion: 'Categoria de vuelo',
        },
      ]);
      expect(productos[0].imagen).toBe('');
      expect(productos[0].marca.nombre).toBe('Hobby Pro');
      expect(productos[0].proveedor.nombre).toBe('Proveedor Uno');
    });

    const productosReq = httpMock.expectOne(productosUrl);
    expect(productosReq.request.method).toBe('GET');
    productosReq.flush(productosResponse);

    const categoriasReq = httpMock.expectOne(categoriasUrl);
    expect(categoriasReq.request.method).toBe('GET');
    categoriasReq.flush(categoriasResponse);
  });

  it('should return products without categories when no matches are found', () => {
    const productoId = faker.string.uuid();

    service.getProductos().subscribe((productos) => {
      expect(productos.length).toBe(1);
      expect(productos[0].categoria).toEqual([]);
    });

    const productosReq = httpMock.expectOne(productosUrl);
    productosReq.flush([
      {
        id: productoId,
        nombre: 'Helicoptero',
        descripcion: 'Sin categoria asociada',
        precio: 3200,
        stock: 5,
        stockMinimo: 1,
        marca: null,
        proveedor: null,
      },
    ]);

    const categoriasReq = httpMock.expectOne(categoriasUrl);
    categoriasReq.flush([]);
  });
});

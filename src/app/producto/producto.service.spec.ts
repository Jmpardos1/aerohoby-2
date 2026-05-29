import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ProductoService } from './producto.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}productos`;

const mockRaw = {
  id: 'p1', nombre: 'Drone', descripcion: 'Vuela', precio: 500,
  stock: 10, stockMinimo: 2, imagenUrl: 'img.png',
  categorias: [{ id: 'c1', nombre: 'Drones', descripcion: '' }],
  marca: { id: 'm1', nombre: 'DJI', descripcion: '' },
  proveedor: { id: 'pr1', nombre: 'TechStore', direccion: 'Av 1', correo: 'ts@test.com', telefono: '1' }
};

describe('ProductoService', () => {
  let service: ProductoService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), ProductoService]
    });
    service = TestBed.inject(ProductoService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getProductos hace GET y mapea categorias e imagen', () => {
    service.getProductos().subscribe(p => {
      const first = p[0];
      expect(first.nombre).toBe('Drone');
      expect(first.categoria?.length).toBeGreaterThan(0);
      expect(first.categoria?.[0].nombre).toBe('Drones');
      expect(first.imagen).toBe('img.png');
    });
    http.expectOne(BASE).flush([mockRaw]);
  });

  it('getProductos maneja producto sin categorias ni imagen', () => {
    service.getProductos().subscribe(p => {
      expect(p[0].categoria).toEqual([]);
      expect(p[0].imagen).toBe('');
    });
    http.expectOne(BASE).flush([{ ...mockRaw, categorias: undefined, imagenUrl: undefined }]);
  });

  it('getProducto hace GET a /productos/:id', () => {
    service.getProducto('p1').subscribe();
    const req = http.expectOne(`${BASE}/p1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRaw);
  });

  it('createProducto hace POST a /productos', () => {
    const data = { nombre: 'X', descripcion: 'Y', precio: 100, stock: 5, stockMinimo: 1 };
    service.createProducto(data).subscribe();
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('POST');
    req.flush(mockRaw);
  });

  it('updateNombre hace PUT a /productos/:id/nombre', () => {
    service.updateNombre('p1', 'Nuevo').subscribe();
    const req = http.expectOne(`${BASE}/p1/nombre`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('updateDescripcion hace PUT a /productos/:id/descripcion', () => {
    service.updateDescripcion('p1', 'Desc').subscribe();
    const req = http.expectOne(`${BASE}/p1/descripcion`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('updateImagenUrl hace PUT a /productos/:id/imagenUrl', () => {
    service.updateImagenUrl('p1', 'url').subscribe();
    const req = http.expectOne(`${BASE}/p1/imagenUrl`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('updatePrecio hace PUT a /productos/:id/precio', () => {
    service.updatePrecio('p1', 999).subscribe();
    const req = http.expectOne(`${BASE}/p1/precio`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('updateStock hace PUT a /productos/:id/stock', () => {
    service.updateStock('p1', 20).subscribe();
    const req = http.expectOne(`${BASE}/p1/stock`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('updateStockMinimo hace PUT a /productos/:id/stockMinimo', () => {
    service.updateStockMinimo('p1', 3).subscribe();
    const req = http.expectOne(`${BASE}/p1/stockMinimo`);
    expect(req.request.method).toBe('PUT');
    req.flush(mockRaw);
  });

  it('deleteProducto hace DELETE a /productos/:id', () => {
    service.deleteProducto('p1').subscribe();
    const req = http.expectOne(`${BASE}/p1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('addCategoria hace POST a /productos/:id/categoria/:cid', () => {
    service.addCategoria('p1', 'c1').subscribe();
    const req = http.expectOne(`${BASE}/p1/categoria/c1`);
    expect(req.request.method).toBe('POST');
    req.flush(mockRaw);
  });
});

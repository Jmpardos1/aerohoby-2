import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticuloService } from './articulo.service';
import { environment } from '../../environments/environment.development';

describe('ArticuloService', () => {
  let service: ArticuloService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}articulos`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticuloService]
    });

    service = TestBed.inject(ArticuloService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todos los articulos', () => {
    const mockArticulos = [
      {
        id: '1',
        titulo: 'Guia de baterias',
        descripcion: 'Consejos para elegir baterias',
        contenido: 'Contenido',
        fechaPublicacion: '2026-05-01',
        autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' },
        productos: []
      }
    ];

    service.getArticulos().subscribe((articulos) => {
      expect(articulos).toEqual(mockArticulos);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticulos);
  });

  it('Debe traer el detalle de un articulo', () => {
    const mockArticuloDetail = {
      id: '1',
      titulo: 'Guia de baterias',
      descripcion: 'Consejos para elegir baterias',
      contenido: 'Contenido completo',
      fechaPublicacion: '2026-05-01',
      autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' },
      productos: []
    };

    service.getArticuloDetail('1').subscribe((articulo) => {
      expect(articulo).toEqual(mockArticuloDetail);
    });

    const req = httpMock.expectOne(`${apiUrl}/1/detail`);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticuloDetail);
  });
});

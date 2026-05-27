import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { faker } from '@faker-js/faker';

import { CategoriaService } from './categoria.service';
import { environment } from '../../environments/environment.development';
import { Categoria } from './categoria';

describe('CategoriaService', () => {
  let service: CategoriaService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.baseUrl}categorias`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoriaService]
    });

    service = TestBed.inject(CategoriaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('Se debe crear', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer todas las categorias', () => {
    const mockCategorias: Categoria[] = [
      {
        id: faker.number.int({ min: 1, max: 100 }) as any,
        nombre: faker.commerce.department(),
        descripcion: faker.lorem.sentence()
      }
    ];

    service.getCategorias().subscribe((categorias) => {
      expect(categorias).toEqual(mockCategorias);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCategorias);
  });
});

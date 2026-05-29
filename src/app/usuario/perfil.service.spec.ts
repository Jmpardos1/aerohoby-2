import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { PerfilService } from './perfil.service';
import { environment } from '../../environments/environment.development';

const BASE = `${environment.baseUrl}usuarios`;

const mockUsuario = {
  id: 'u1', nombre: 'Ana', correo: 'ana@test.com',
  telefono: '123', rol: 'CLIENT'
};

describe('PerfilService', () => {
  let service: PerfilService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(PerfilService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => http.verify());

  it('se debe crear', () => expect(service).toBeTruthy());

  it('getUsuarios hace GET a /usuarios', () => {
    service.getUsuarios().subscribe(r => expect(r).toEqual([mockUsuario]));
    const req = http.expectOne(BASE);
    expect(req.request.method).toBe('GET');
    req.flush([mockUsuario]);
  });

  it('getPerfil hace GET a /usuarios/:id', () => {
    service.getPerfil('u1').subscribe(r => expect(r).toEqual(mockUsuario as any));
    const req = http.expectOne(`${BASE}/u1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsuario);
  });

  it('updatePerfil hace PUT a /usuarios/:id con los datos', () => {
    const changes = { nombre: 'Ana M', correo: 'ana@test.com', telefono: '456', rol: 'CLIENT' };
    service.updatePerfil('u1', changes).subscribe(r => expect(r).toEqual(mockUsuario as any));
    const req = http.expectOne(`${BASE}/u1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(changes);
    req.flush(mockUsuario);
  });

  it('cambiarRol hace PATCH a /usuarios/:id/rol con el nuevo rol', () => {
    service.cambiarRol('u1', 'ADMIN').subscribe(r => expect(r).toEqual(mockUsuario as any));
    const req = http.expectOne(`${BASE}/u1/rol`);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ rol: 'ADMIN' });
    req.flush(mockUsuario);
  });
});

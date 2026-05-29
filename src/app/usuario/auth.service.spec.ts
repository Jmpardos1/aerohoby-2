import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment.development';

const BASE = environment.baseUrl + 'auth';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  const setup = (platformId = 'browser') => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: PLATFORM_ID, useValue: platformId }]
    });
    service = TestBed.inject(AuthService);
    http = TestBed.inject(HttpTestingController);
  };

  afterEach(() => { localStorage.clear(); http?.verify(); });

  it('se deberia crear', () => { setup(); expect(service).toBeTruthy(); });

  describe('login', () => {
    beforeEach(() => setup());

    it('hace POST y guarda datos en localStorage', () => {
      const res = { token: 'tok', rol: 'CLIENT', nombre: 'Juan', imagenUrl: 'img.png', id: 'uid-1' };
      service.login('a@b.com', 'pass').subscribe();
      const req = http.expectOne(`${BASE}/login`);
      expect(req.request.method).toBe('POST');
      req.flush(res);
      expect(localStorage.getItem('token')).toBe('tok');
      expect(localStorage.getItem('rol')).toBe('CLIENT');
      expect(localStorage.getItem('nombre')).toBe('Juan');
      expect(localStorage.getItem('uid')).toBe('uid-1');
    });

    it('guarda imagenUrl vacío si viene null', () => {
      service.login('a@b.com', 'pass').subscribe();
      http.expectOne(`${BASE}/login`).flush({ token: 't', rol: 'CLIENT', nombre: 'X', imagenUrl: null, id: '1' });
      expect(localStorage.getItem('imagenUrl')).toBe('');
    });
  });

  describe('logout', () => {
    beforeEach(() => setup());

    it('elimina todas las claves del localStorage', () => {
      localStorage.setItem('token', 'abc');
      localStorage.setItem('uid', 'u1');
      service.logout();
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('uid')).toBeNull();
    });
  });

  describe('register', () => {
    beforeEach(() => setup());

    it('hace POST a /auth/register', () => {
      service.register('Ana', 'a@b.com', '123', 'pass8', 'CLIENT').subscribe();
      const req = http.expectOne(`${BASE}/register`);
      expect(req.request.method).toBe('POST');
      req.flush({});
    });
  });

  describe('getters desde localStorage', () => {
    beforeEach(() => {
      setup();
      localStorage.setItem('token', 'mytoken');
      localStorage.setItem('rol', 'ADMIN');
      localStorage.setItem('nombre', 'Carlos');
      localStorage.setItem('imagenUrl', 'http://img.png');
    });

    it('getToken devuelve el token', () => expect(service.getToken()).toBe('mytoken'));
    it('getRol devuelve el rol', () => expect(service.getRol()).toBe('ADMIN'));
    it('getNombre devuelve el nombre', () => expect(service.getNombre()).toBe('Carlos'));
    it('getImagenUrl devuelve la imagen', () => expect(service.getImagenUrl()).toBe('http://img.png'));
    it('isLoggedIn es true cuando hay token', () => expect(service.isLoggedIn()).toBeTrue());
  });

  describe('sin token en localStorage', () => {
    beforeEach(() => setup());

    it('isLoggedIn es false sin token', () => expect(service.isLoggedIn()).toBeFalse());
    it('getToken devuelve null', () => expect(service.getToken()).toBeNull());
    it('getRol devuelve null', () => expect(service.getRol()).toBeNull());
    it('getNombre devuelve null', () => expect(service.getNombre()).toBeNull());
    it('getImagenUrl devuelve null', () => expect(service.getImagenUrl()).toBeNull());
  });

  describe('en plataforma server (SSR)', () => {
    it('getToken retorna null fuera del browser', () => {
      setup('server');
      expect(service.getToken()).toBeNull();
    });
    it('isLoggedIn retorna false fuera del browser', () => {
      setup('server');
      expect(service.isLoggedIn()).toBeFalse();
    });
  });
});

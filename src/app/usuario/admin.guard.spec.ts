import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
  const run = () => TestBed.runInInjectionContext(() => adminGuard({} as any, {} as any));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideRouter([])
      ]
    });
  });

  afterEach(() => localStorage.clear());

  it('permite el acceso cuando el rol es ADMIN', () => {
    localStorage.setItem('rol', 'ADMIN');
    expect(run()).toBeTrue();
  });

  it('redirige a /productos cuando el rol es CLIENT', () => {
    localStorage.setItem('rol', 'CLIENT');
    const result = run() as any;
    expect(result.toString()).toContain('productos');
  });

  it('redirige a /productos cuando no hay rol', () => {
    const result = run() as any;
    expect(result.toString()).toContain('productos');
  });
});

import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { guestGuard } from './guest.guard';

describe('guestGuard', () => {
  const run = () => TestBed.runInInjectionContext(() => guestGuard({} as any, {} as any));

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

  it('permite el acceso cuando NO hay sesión', () => {
    expect(run()).toBeTrue();
  });

  it('redirige a /productos cuando ya hay sesión activa', () => {
    localStorage.setItem('token', 'abc');
    const result = run() as any;
    expect(result.toString()).toContain('productos');
  });
});

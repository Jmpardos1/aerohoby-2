import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PLATFORM_ID } from '@angular/core';
import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';

describe('authGuard', () => {
  let authService: AuthService;
  let router: Router;

  const run = () => TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideRouter([])
      ]
    });
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  afterEach(() => localStorage.clear());

  it('permite el acceso cuando hay token', () => {
    localStorage.setItem('token', 'valid');
    expect(run()).toBeTrue();
  });

  it('redirige a / cuando no hay token', () => {
    const result = run() as any;
    expect(result.toString()).toContain('/');
  });
});

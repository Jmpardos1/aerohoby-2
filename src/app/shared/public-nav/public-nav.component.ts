import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../usuario/auth.service';

@Component({
  selector: 'app-public-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="lp-header">
      <div class="lp-header-inner">
        <a routerLink="/" class="lp-header-brand" style="text-decoration:none;">
          <span class="lp-hb-aero">AERO</span>
          <span class="lp-hb-sep"></span>
          <span class="lp-hb-hobby">HOBBY</span>
        </a>
        <nav class="lp-header-nav">
          <a routerLink="/productos" class="lp-hn-link">Productos</a>
          <a routerLink="/articulos" class="lp-hn-link">Blog</a>
          <a routerLink="/" fragment="features" class="lp-hn-link">Nosotros</a>
        </nav>
        <div class="lp-header-actions">
          @if (authService.isLoggedIn()) {
            <a routerLink="/carrito" class="lp-ha-cart" title="Carrito">
              <img src="/images/834526.png" alt="Carrito" class="lp-ha-cart-icon">
            </a>
            <a routerLink="/perfil" class="lp-ha-login">{{ authService.getNombre() }}</a>
            <button class="lp-ha-register lp-ha-logout" (click)="logout()">Cerrar sesión</button>
          } @else {
            <a routerLink="/login" class="lp-ha-cart" title="Carrito">
              <img src="/images/834526.png" alt="Carrito" class="lp-ha-cart-icon">
            </a>
            <a routerLink="/login"    class="lp-ha-login">Iniciar sesión</a>
            <a routerLink="/register" class="lp-ha-register">Registrarse</a>
          }
        </div>
      </div>
    </header>
  `,
})
export class PublicNavComponent {
  constructor(public authService: AuthService, private router: Router) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../usuario/auth.service';
import { AsesorChatService } from '../../asesor/asesor-chat.service';

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
          <button class="lp-hn-link lp-hn-btn" (click)="asesorService.abrirWidget()">Asesor IA</button>
          <a routerLink="/articulos" class="lp-hn-link">Blog</a>
          <a routerLink="/" fragment="features" class="lp-hn-link">Nosotros</a>
          @if (esAdmin) {
            <div class="lp-admin-menu">
              <button class="lp-admin-trigger" (click)="adminOpen = !adminOpen">
                <i class="bi bi-shield-lock"></i> Admin
                <i class="bi bi-chevron-down lp-admin-chevron" [class.open]="adminOpen"></i>
              </button>
              @if (adminOpen) {
                <div class="lp-admin-dropdown">
                  <a routerLink="/admin/productos" class="lp-admin-item" (click)="adminOpen=false">
                    <i class="bi bi-box-seam"></i> Productos
                  </a>
                  <a routerLink="/admin/usuarios" class="lp-admin-item" (click)="adminOpen=false">
                    <i class="bi bi-people"></i> Usuarios
                  </a>
                  <a routerLink="/admin/cupones" class="lp-admin-item" (click)="adminOpen=false">
                    <i class="bi bi-tag"></i> Cupones
                  </a>
                </div>
              }
            </div>
          }
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
  adminOpen = false;

  constructor(
    public authService: AuthService,
    public asesorService: AsesorChatService,
    private router: Router
  ) {}

  get esAdmin(): boolean {
    return localStorage.getItem('rol') === 'ADMIN';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

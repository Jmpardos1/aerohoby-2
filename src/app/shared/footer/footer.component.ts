import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  template: `
    <footer class="ah-footer">
      <div class="ah-footer-inner">
        <div class="ah-footer-brand">
          <div class="ah-footer-logo">
            <span class="ah-footer-aero">AERO</span>
            <span class="ah-footer-sep"></span>
            <span class="ah-footer-hobby">HOBBY</span>
          </div>
          <p class="ah-footer-tagline">El ecosistema digital del aeromodelismo profesional</p>
        </div>
        <nav class="ah-footer-cols">
          <div class="ah-footer-col">
            <p class="ah-footer-col-title">Tienda</p>
            <a routerLink="/productos" class="ah-footer-link">Productos</a>
            <a routerLink="/categorias" class="ah-footer-link">Categorías</a>
          </div>
          <div class="ah-footer-col">
            <p class="ah-footer-col-title">Recursos</p>
            <a routerLink="/articulos" class="ah-footer-link">Blog técnico</a>
          </div>
          <div class="ah-footer-col">
            <p class="ah-footer-col-title">Cuenta</p>
            <a routerLink="/login"    class="ah-footer-link">Iniciar sesión</a>
            <a routerLink="/register" class="ah-footer-link">Registrarse</a>
          </div>
        </nav>
      </div>
      <div class="ah-footer-bottom">
        <p>© 2025 AeroHobby Hub. Todos los derechos reservados.</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {}

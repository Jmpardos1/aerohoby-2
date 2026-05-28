import { Component, HostListener, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './usuario/auth.service';
import { CarritoService } from './carrito/carrito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ISIS2603_202610_S2_E4_Aerohobby_Front');
  profileOpen = false;
  sidebarOpen = false;

  constructor(
    public authService: AuthService,
    public carritoService: CarritoService,
    private router: Router
  ) {}

  toggleSidebar(event: Event): void {
    event.stopPropagation();
    this.sidebarOpen = !this.sidebarOpen;
    this.profileOpen = false;
  }

  toggleProfile(event: Event): void {
    event.stopPropagation();
    this.profileOpen = !this.profileOpen;
    this.sidebarOpen = false;
  }

  @HostListener('document:click')
  closeAll(): void {
    this.profileOpen = false;
    this.sidebarOpen = false;
  }

  get isPublicPage(): boolean {
    const url = this.router.url.split('?')[0].split('#')[0];
    return ['/', '/productos', '/articulos', '/carrito', '/perfil', '/ordenes-compra', '/cupones',
            '/admin/productos', '/admin/usuarios', '/admin/cupones'].includes(url) || url.startsWith('/articulos/');
  }

  logout(): void {
    this.closeAll();
    this.authService.logout();
    this.router.navigate(['/']);
  }
}

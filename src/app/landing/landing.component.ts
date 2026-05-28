import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, DecimalPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../usuario/auth.service';
import { ProductoService } from '../producto/producto.service';
import { ArticuloService } from '../articulo/articulo.service';
import { Producto } from '../producto/producto';
import { Articulo } from '../articulo/articulo';
import { PublicNavComponent } from '../shared/public-nav/public-nav.component';
import { FooterComponent } from '../shared/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule, DecimalPipe, DatePipe, PublicNavComponent, FooterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent implements OnInit {
  @ViewChild('carousel') carouselRef!: ElementRef<HTMLElement>;

  productos: Producto[] = [];
  articulos: Articulo[] = [];
  cargandoProductos = true;

  constructor(
    public authService: AuthService,
    private productoService: ProductoService,
    private articuloService: ArticuloService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    const scale = 1 + progress * 0.18;
    const bg = document.querySelector('.lp-hero-bg') as HTMLElement | null;
    if (bg) bg.style.transform = `scale(${scale})`;
  }

  ngOnInit(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.slice(0, 8);
        this.cargandoProductos = false;
      },
      error: () => {
        this.cargandoProductos = false;
      },
    });

    this.articuloService.getArticulos().subscribe({
      next: (data) => {
        this.articulos = data.slice(0, 3);
      },
      error: () => {},
    });
  }

  carouselScroll(dir: 1 | -1): void {
    const el = this.carouselRef?.nativeElement;
    if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }

  getProductoIcon(producto: Producto): string {
    const n = producto.nombre?.toLowerCase() ?? '';
    if (n.includes('motor'))                            return '⚙️';
    if (n.includes('hélice') || n.includes('helice'))   return '🌀';
    if (n.includes('batería') || n.includes('bateria')) return '🔋';
    if (n.includes('cámara') || n.includes('camara'))   return '📷';
    if (n.includes('control') || n.includes('radio'))   return '📡';
    if (n.includes('frame') || n.includes('chasis'))    return '🔩';
    if (n.includes('drone') || n.includes('dron'))      return '🚁';
    return '🔧';
  }
}

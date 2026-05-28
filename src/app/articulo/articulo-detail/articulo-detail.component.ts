import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticuloDetail } from '../articulo-detail';
import { ArticuloService } from '../articulo.service';

@Component({
  selector: 'app-articulo-detail',
  standalone: false,
  templateUrl: './articulo-detail.component.html',
  styleUrl: './articulo-detail.component.css',
})
export class ArticuloDetailComponent implements OnInit {
  @Input() articuloDetail!: ArticuloDetail | null;
  cargando = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private articuloService: ArticuloService
  ) {}

  get esStandalone(): boolean {
    return !!this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id || this.articuloDetail) return;

    this.cargando = true;
    this.articuloService.getArticuloDetail(id).subscribe({
      next: (articulo) => {
        this.articuloDetail = articulo;
        this.cargando = false;
      },
      error: () => {
        this.error = 'No pudimos cargar este artículo. Intenta volver al blog.';
        this.cargando = false;
      },
    });
  }
}

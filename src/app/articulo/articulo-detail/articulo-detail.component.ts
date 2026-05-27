import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo, Comentario } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { AuthService } from '../../usuario/auth.service';

@Component({
  selector: 'app-articulo-detail',
  standalone: false,
  templateUrl: './articulo-detail.component.html',
  styleUrl: './articulo-detail.component.css',
})
export class ArticuloDetailComponent implements OnInit {
  articulo: Articulo | undefined;
  comentarios: Comentario[] = [];
  nuevoComentario = '';
  enviando = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articuloService: ArticuloService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.articuloService.getArticulo(id).subscribe({
      next: a => {
        this.articulo = a;
        this.cargarComentarios(id);
      },
      error: () => {
        this.toastr.error('Artículo no encontrado.');
        this.router.navigate(['/articulos']);
      }
    });
  }

  private cargarComentarios(articuloId: string): void {
    this.articuloService.getComentarios(articuloId).subscribe({
      next: c => (this.comentarios = c),
      error: () => {}
    });
  }

  comentar(): void {
    if (!this.nuevoComentario.trim() || !this.articulo) return;
    const autorId = localStorage.getItem('uid');
    if (!autorId) return;

    this.enviando = true;
    this.articuloService.createComentario(this.articulo.id, { contenido: this.nuevoComentario.trim(), autorId }).subscribe({
      next: c => {
        this.comentarios.push(c);
        this.nuevoComentario = '';
        this.enviando = false;
        this.toastr.success('Comentario publicado.');
      },
      error: () => {
        this.enviando = false;
        this.toastr.error('Error al comentar.');
      }
    });
  }

  get esAdmin(): boolean {
    return this.authService.getRol() === 'ADMIN';
  }

  eliminarComentario(c: Comentario): void {
    if (!this.articulo) return;
    this.articuloService.deleteComentario(this.articulo.id, c.id).subscribe({
      next: () => {
        this.comentarios = this.comentarios.filter(x => x.id !== c.id);
        this.toastr.success('Comentario eliminado.');
      },
      error: () => this.toastr.error('Error al eliminar.')
    });
  }

  volver(): void {
    this.router.navigate(['/articulos']);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Articulo } from '../articulo';
import { ArticuloService } from '../articulo.service';
import { AuthService } from '../../usuario/auth.service';

@Component({
  selector: 'app-articulo-list',
  standalone: false,
  templateUrl: './articulo-list.component.html',
  styleUrl: './articulo-list.component.css',
})
export class ArticuloListComponent implements OnInit {
  articulos: Articulo[] = [];
  mostrarFormulario = false;
  form!: FormGroup;

  constructor(
    private articuloService: ArticuloService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.articuloService.getArticulos().subscribe({
      next: a => (this.articulos = a),
      error: () => this.toastr.error('Error al cargar artículos.')
    });

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      contenido: ['', Validators.required],
    });
  }

  get esExperto(): boolean {
    const rol = this.authService.getRol();
    return rol === 'EXPERT' || rol === 'ADMIN';
  }

  get esAdmin(): boolean {
    return this.authService.getRol() === 'ADMIN';
  }

  eliminarArticulo(id: string, event: Event): void {
    event.stopPropagation();
    if (!confirm('¿Eliminar este artículo y todos sus comentarios?')) return;
    this.articuloService.deleteArticulo(id).subscribe({
      next: () => {
        this.articulos = this.articulos.filter(a => a.id !== id);
        this.toastr.success('Artículo eliminado.');
      },
      error: () => this.toastr.error('Error al eliminar el artículo.'),
    });
  }

  abrirFormulario(): void {
    this.form.reset();
    this.mostrarFormulario = true;
  }

  publicar(): void {
    if (this.form.invalid) return;
    const autorId = localStorage.getItem('uid');
    if (!autorId) return;

    const hoy = new Date().toISOString().split('T')[0];
    this.articuloService.createArticulo({ ...this.form.value, fechaPublicacion: hoy, autorId }).subscribe({
      next: a => {
        this.articulos.unshift(a);
        this.mostrarFormulario = false;
        this.toastr.success('Artículo publicado.');
      },
      error: () => this.toastr.error('Error al publicar el artículo.')
    });
  }

  irDetalle(id: string): void {
    this.router.navigate(['/articulos', id]);
  }
}

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../producto';
import { CarritoService } from '../../carrito/carrito.service';
import { AuthService } from '../../usuario/auth.service';
import { ReviewService } from '../../review/review.service';
import { Review } from '../../review/review';

@Component({
  selector: 'app-producto-detail',
  standalone: false,
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css',
})
export class ProductoDetailComponent implements OnInit, OnChanges {
  @Input() productoDetail!: Producto;

  agregado = false;
  reviews: Review[] = [];
  mostrarFormReview = false;
  reviewForm!: FormGroup;
  estrellaHover = 0;
  reviewError = '';
  cargandoReviews = false;

  constructor(
    private readonly carritoService: CarritoService,
    private readonly authService: AuthService,
    private readonly reviewService: ReviewService,
    private readonly fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.reviewForm = this.fb.group({
      puntuacion: [0, [Validators.required, Validators.min(1)]],
      contenido:  ['', [Validators.required, Validators.maxLength(500)]],
    });
    this.cargarReviews();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productoDetail'] && !changes['productoDetail'].firstChange) {
      this.cargarReviews();
      this.mostrarFormReview = false;
      this.reviewForm?.reset({ puntuacion: 0, contenido: '' });
    }
  }

  get esAdmin(): boolean {
    return this.authService.getRol() === 'ADMIN';
  }

  get promedioEstrellas(): string {
    if (!this.reviews.length) return '0';
    return (this.reviews.reduce((s, r) => s + r.puntuacion, 0) / this.reviews.length).toFixed(1);
  }

  cargarReviews(): void {
    this.cargandoReviews = true;
    this.reviewService.getReviewsByProducto(String(this.productoDetail.id)).subscribe({
      next: data => { this.reviews = data || []; this.cargandoReviews = false; },
      error: ()  => { this.reviews = [];           this.cargandoReviews = false; },
    });
  }

  agregarAlCarrito(): void {
    this.carritoService.agregar(this.productoDetail);
    this.agregado = true;
    setTimeout(() => (this.agregado = false), 2000);
  }

  seleccionarEstrella(n: number): void {
    this.reviewForm.patchValue({ puntuacion: n });
  }

  estrellas(): string[] {
    const activa = this.estrellaHover || this.reviewForm?.get('puntuacion')?.value || 0;
    return Array.from({ length: 5 }, (_, i) => (i < activa ? '★' : '☆'));
  }

  starRange(puntuacion: number): boolean[] {
    return [1, 2, 3, 4, 5].map(n => n <= puntuacion);
  }

  crearReview(): void {
    if (this.reviewForm.invalid || this.reviewForm.get('puntuacion')!.value === 0) return;
    const uid = localStorage.getItem('uid');
    if (!uid) return;

    this.reviewError = '';
    const hoy = new Date().toISOString().split('T')[0];
    const { puntuacion, contenido } = this.reviewForm.value;

    this.reviewService.createReview({
      puntuacion,
      contenido,
      fecha: hoy,
      usuarioId: uid,
      productoId: String(this.productoDetail.id),
    }).subscribe({
      next: () => {
        this.mostrarFormReview = false;
        this.reviewForm.reset({ puntuacion: 0, contenido: '' });
        this.cargarReviews();
      },
      error: () => { this.reviewError = 'Error al publicar la reseña.'; },
    });
  }
}

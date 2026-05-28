import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { PLATFORM_ID } from '@angular/core';
import { of } from 'rxjs';

import { ProductoDetailComponent } from './producto-detail.component';
import { ReviewService } from '../../review/review.service';
import { Producto } from '../producto';
import { Review } from '../../review/review';

const mockProducto: Producto = {
  id: 1,
  nombre: 'Avion RC',
  descripcion: 'Producto de prueba',
  precio: 5000,
  stock: 10,
  stockMinimo: 2,
  categoria: [{ id: 1, nombre: 'Aviones', descripcion: '' }],
  marca: { id: 1, nombre: 'Marca prueba', descripcion: '' },
  imagen: '',
  proveedor: { nombre: 'Proveedor prueba', direccion: '', correo: '', telefono: '' }
};

const mockReview: Review = {
  id: 'r1',
  puntuacion: 4,
  fecha: '2026-05-26',
  contenido: 'Buen producto',
  usuarioId: 'u1',
  productoId: '1'
};

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ReviewService', ['getReviewsByProducto', 'createReview']);
    spy.getReviewsByProducto.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [ProductoDetailComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        { provide: ReviewService, useValue: spy }
      ]
    }).compileComponents();

    reviewServiceSpy = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
    component.productoDetail = mockProducto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('cargarReviews llama al servicio con el id del producto', () => {
    expect(reviewServiceSpy.getReviewsByProducto).toHaveBeenCalledWith('1');
  });

  it('starRange devuelve los rellenos correctos para cada puntuación', () => {
    expect(component.starRange(3)).toEqual([true, true, true, false, false]);
    expect(component.starRange(5)).toEqual([true, true, true, true, true]);
    expect(component.starRange(0)).toEqual([false, false, false, false, false]);
  });

  it('promedioEstrellas calcula el promedio correctamente', () => {
    component.reviews = [
      { ...mockReview, puntuacion: 4 },
      { ...mockReview, id: 'r2', puntuacion: 2 }
    ];
    expect(component.promedioEstrellas).toBe('3.0');
  });

  it('agregarAlCarrito activa la confirmación visual brevemente', (done) => {
    component.agregarAlCarrito();
    expect(component.agregado).toBeTrue();
    setTimeout(() => {
      expect(component.agregado).toBeFalse();
      done();
    }, 2100);
  });

  it('crearReview envía productoId correcto y recarga las reseñas', () => {
    spyOn(localStorage, 'getItem').and.returnValue('uid-test');
    reviewServiceSpy.createReview.and.returnValue(of(mockReview));
    reviewServiceSpy.getReviewsByProducto.and.returnValue(of([mockReview]));

    component.reviewForm.patchValue({ puntuacion: 4, contenido: 'Buen producto' });
    component.crearReview();

    const payload = reviewServiceSpy.createReview.calls.mostRecent().args[0];
    expect(payload.productoId).toBe('1');
    expect(payload.usuarioId).toBe('uid-test');
    expect(reviewServiceSpy.getReviewsByProducto).toHaveBeenCalledTimes(2);
  });

  it('crearReview no hace nada si no hay usuario en sesión', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    component.reviewForm.patchValue({ puntuacion: 4, contenido: 'Test' });
    component.crearReview();
    expect(reviewServiceSpy.createReview).not.toHaveBeenCalled();
  });
});

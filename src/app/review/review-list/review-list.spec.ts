import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReviewListComponent } from './review-list';
import { ReviewService } from '../review.service';
import { Review } from '../review';
import { RouterTestingModule } from '@angular/router/testing';

describe('ReviewListComponent', () => {
  let component: ReviewListComponent;
  let fixture: ComponentFixture<ReviewListComponent>;
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;

  const mockReviews: Review[] = [
    {
      id: '1', puntuacion: 5, fecha: '2026-05-03',
      contenido: '¡Excelente servicio!', usuarioId: '100',
      autor: { id: 100, nombre: 'Juan', correo: 'juan@test.com', telefono: '123', rol: 'USER', direcciones: [] }
    },
    {
      id: '2', puntuacion: 4, fecha: '2026-05-02',
      contenido: 'Muy bueno.', usuarioId: '101',
      autor: { id: 101, nombre: 'Maria', correo: 'maria@test.com', telefono: '456', rol: 'USER', direcciones: [] }
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ReviewService', ['getReviews']);

    await TestBed.configureTestingModule({
      declarations: [ReviewListComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: ReviewService, useValue: spy }]
    }).compileComponents();

    reviewServiceSpy = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    reviewServiceSpy.getReviews.and.returnValue(of([]));
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('carga y filtra reseñas del usuario en sesión', () => {
    spyOn(localStorage, 'getItem').and.returnValue('100');
    reviewServiceSpy.getReviews.and.returnValue(of(mockReviews));
    fixture.detectChanges();

    expect(reviewServiceSpy.getReviews).toHaveBeenCalled();
    expect(component.reviews.length).toBe(1);
    expect(component.reviews[0].usuarioId).toBe('100');
  });

  it('muestra lista vacía cuando no hay reseñas del usuario', () => {
    spyOn(localStorage, 'getItem').and.returnValue('999');
    reviewServiceSpy.getReviews.and.returnValue(of(mockReviews));
    fixture.detectChanges();

    expect(component.reviews.length).toBe(0);
  });

});

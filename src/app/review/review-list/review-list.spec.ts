import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
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
      id: '1',
      puntuacion: 5,
      fecha: '2026-05-03',
      contenido: '¡Excelente servicio!',
      usuarioId: '100',
      autor: { id: 100, nombre: 'Juan', correo: 'juan@test.com', telefono: '123', rol: 'USER' }
    },
    {
      id: '2',
      puntuacion: 4,
      fecha: '2026-05-02',
      contenido: 'Muy bueno, pero puede mejorar.',
      usuarioId: '101',
      autor: { id: 101, nombre: 'Maria', correo: 'maria@test.com', telefono: '456', rol: 'USER' }
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ReviewService', ['getReviews']);

    await TestBed.configureTestingModule({
      declarations: [ ReviewListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ReviewService, useValue: spy }
      ]
    }).compileComponents();

    reviewServiceSpy = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewListComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar la lista de reseñas al iniciar', () => {
   
    reviewServiceSpy.getReviews.and.returnValue(of(mockReviews));
    fixture.detectChanges();

    expect(reviewServiceSpy.getReviews).toHaveBeenCalled();
    expect(component.reviews.length).toBe(2);
    expect(component.reviews).toEqual(mockReviews);
  });

});
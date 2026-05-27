import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { ReviewDetailComponent } from './review-detail';
import { ReviewService } from '../review.service';
import { Review } from '../review';

describe('ReviewDetailComponent', () => {
  let component: ReviewDetailComponent;
  let fixture: ComponentFixture<ReviewDetailComponent>;
  let reviewServiceSpy: jasmine.SpyObj<ReviewService>;

  const mockReview: Review = {
    id: '1',
    puntuacion: 5,
    fecha: '2026-05-03',
    contenido: '¡Excelente tienda! El propulsor llegó en perfecto estado.',
    usuarioId: '100',
    autor: {
      id: 100,
      nombre: 'Juan Perez',
      correo: 'juan@test.com',
      telefono: '123456',
      rol: 'CLIENT',
      direcciones: []
    }
  };

  beforeEach(async () => {
    
    const spy = jasmine.createSpyObj('ReviewService', ['getReviewById']);

   
    const activatedRouteMock = {
      paramMap: of({
        get: (key: string) => '1'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [ ReviewDetailComponent ],
      imports: [ 
        RouterTestingModule, 
        HttpClientTestingModule 
      ],
      providers: [
        { provide: ReviewService, useValue: spy },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ]
    }).compileComponents();

    reviewServiceSpy = TestBed.inject(ReviewService) as jasmine.SpyObj<ReviewService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewDetailComponent);
    component = fixture.componentInstance;
  });

  it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería cargar el detalle de la reseña al iniciar', () => {
    reviewServiceSpy.getReviewById.and.returnValue(of(mockReview));
    fixture.detectChanges();

    expect(reviewServiceSpy.getReviewById).toHaveBeenCalledWith('1');
    expect(component.review).toEqual(mockReview);
    expect(component.isLoading).toBeFalse();
  });

});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CuponListComponent } from './cupon-list.component';
import { CuponService } from '../cupon.service';
import { Cupon } from '../cupon';

describe('CuponListComponent', () => {
  let component: CuponListComponent;
  let fixture: ComponentFixture<CuponListComponent>;
  let service: jasmine.SpyObj<CuponService>;

  const mockCupones: Cupon[] = [
    {
      id: '1',
      codigoCupon: 'PROMO10',
      porcentaje: 10,
      fechaVencimiento: '2099-12-31T23:59:59',
      ordenCompra: null
    },
    {
      id: '2',
      codigoCupon: 'PROMO20',
      porcentaje: 20,
      fechaVencimiento: '2020-01-01T00:00:00',
      ordenCompra: null
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CuponService', ['getCupones']);
    serviceSpy.getCupones.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [CuponListComponent],
      providers: [
        { provide: CuponService, useValue: serviceSpy }
      ]
    }).compileComponents();

    service = TestBed.inject(CuponService) as jasmine.SpyObj<CuponService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CuponListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los cupones correctamente', () => {
    service.getCupones.and.returnValue(of(mockCupones));

    fixture.detectChanges();

    expect(service.getCupones).toHaveBeenCalled();
    expect(component.cupones).toEqual(mockCupones);
    expect(component.isLoading).toBeFalse();
  });

  it('Debe identificar un cupon vencido', () => {
    expect(component.estaVencido(mockCupones[1])).toBeTrue();
    expect(component.estaVencido(mockCupones[0])).toBeFalse();
  });
});

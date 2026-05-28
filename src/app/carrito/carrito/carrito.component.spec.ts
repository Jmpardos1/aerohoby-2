import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ToastrModule } from 'ngx-toastr';
import { CarritoComponent } from './carrito.component';
import { CarritoService } from '../carrito.service';
import { CarritoItem } from '../carrito-item';

describe('CarritoComponent', () => {
  let component: CarritoComponent;
  let fixture: ComponentFixture<CarritoComponent>;
  let carritoServiceSpy: jasmine.SpyObj<CarritoService>;

  const mockItems: CarritoItem[] = [
    { productoId: '1', nombre: 'Propulsor X1', precio: 750, cantidad: 2 },
    { productoId: '2', nombre: 'Alas Flex', precio: 120, cantidad: 1 }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CarritoService', [
      'getItems', 'quitar', 'actualizarCantidad', 'vaciar', 'getTotal', 'getCantidadTotal'
    ]);
    spy.getItems.and.returnValue([]);
    spy.getTotal.and.returnValue(0);
    spy.getCantidadTotal.and.returnValue(0);

    await TestBed.configureTestingModule({
      declarations: [CarritoComponent],
      imports: [ToastrModule.forRoot()],
      providers: [
        { provide: CarritoService, useValue: spy },
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimationsAsync(),
        provideRouter([])
      ]
    }).compileComponents();

    carritoServiceSpy = TestBed.inject(CarritoService) as jasmine.SpyObj<CarritoService>;
    fixture = TestBed.createComponent(CarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('items retorna los items del servicio', () => {
    carritoServiceSpy.getItems.and.returnValue(mockItems);
    expect(component.items).toEqual(mockItems);
  });

});

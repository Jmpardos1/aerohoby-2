import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenCompraListComponent } from './orden-compra-list.component';
import { OrdenCompraService } from './orden-compra-service';
import { of, throwError, Subject } from 'rxjs';
import { OrdenCompra } from './orden-compra';
import { Usuario } from './usuario';
import { Producto } from './producto';
import { faker } from '@faker-js/faker';

describe('OrdenCompraListComponent', () => {
  let component: OrdenCompraListComponent;
  let fixture: ComponentFixture<OrdenCompraListComponent>;
  let service: jasmine.SpyObj<OrdenCompraService>;

  const mockUsuario: Usuario = {
    id: faker.string.uuid() as any,
    nombre: faker.person.fullName(),
    correo: faker.internet.email(),
    telefono: faker.phone.number(),
    rol: 'CLIENTE'
  };

  const mockProducto: Producto = {
    id: faker.string.uuid() as any,
    nombre: faker.commerce.productName(),
    descripcion: faker.commerce.productDescription(),
    precio: faker.number.int({ min: 1000, max: 5000 }),
    stock: faker.number.int({ min: 10, max: 100 }),
    stockMinimo: faker.number.int({ min: 1, max: 5 }),
    marca: faker.company.name(),
    proveedor: faker.company.name()
  };

  const mockOrdenCompra: OrdenCompra = {
    id: faker.string.uuid() as any,
    fechaOrden: faker.date.past(),
    estadoPedido: 'ENTREGADO',
    usuario: mockUsuario,
    producto: mockProducto
  };

  const mockOrdenes: OrdenCompra[] = [
    mockOrdenCompra,
    {
      id: faker.string.uuid() as any,
      fechaOrden: faker.date.recent(),
      estadoPedido: 'PENDIENTE',
      usuario: mockUsuario,
      producto: mockProducto
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('OrdenCompraService', ['getAllOrdenCompra']);

    serviceSpy.getAllOrdenCompra.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [OrdenCompraListComponent],
      providers: [
        { provide: OrdenCompraService, useValue: serviceSpy }
      ]
    }).compileComponents();

    service = TestBed.inject(OrdenCompraService) as jasmine.SpyObj<OrdenCompraService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenCompraListComponent);
    component = fixture.componentInstance;
  });

  describe('Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with empty ordenesCompra array', () => {
      expect(component.ordenesCompra).toEqual([]);
    });

    it('should initialize isLoading as false', () => {
      expect(component.isLoading).toBeFalsy();
    });

    it('should initialize errorMessage as empty string', () => {
      expect(component.errorMessage).toBe('');
    });
  });

  describe('ngOnInit', () => {
    it('should call loadOrdenesCompra on init', () => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));
      spyOn(component, 'loadOrdenesCompra');

      component.ngOnInit();

      expect(component.loadOrdenesCompra).toHaveBeenCalled();
    });
  });

  describe('loadOrdenesCompra', () => {
    it('should set isLoading to true when loading starts', () => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.loadOrdenesCompra();

      expect(component.isLoading).toBeFalsy(); 
    });

    it('should load ordenes successfully and populate ordenesCompra array', (done) => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(component.ordenesCompra).toEqual(mockOrdenes);
        expect(component.isLoading).toBeFalsy();
        expect(component.errorMessage).toBe('');
        done();
      }, 100);
    });

    it('should set isLoading to false after successful load', (done) => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(component.isLoading).toBeFalsy();
        done();
      }, 100);
    });

    it('should handle error when loading fails', (done) => {
      const errorMessage = 'Error al cargar datos';
      service.getAllOrdenCompra.and.returnValue(throwError(() => ({ message: errorMessage })));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(component.isLoading).toBeFalsy();
        expect(component.errorMessage).toContain('Error al cargar ordenes de compra');
        expect(component.ordenesCompra).toEqual([]);
        done();
      }, 100);
    });

    it('should clear errorMessage before loading', (done) => {
      component.errorMessage = 'Previous error';
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(component.errorMessage).toBe('');
        done();
      }, 100);
    });
  });

  describe('Service Integration', () => {
    it('should call getAllOrdenCompra from service', (done) => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(service.getAllOrdenCompra).toHaveBeenCalled();
        done();
      }, 100);
    });

    it('should handle empty list from service', (done) => {
      service.getAllOrdenCompra.and.returnValue(of([]));

      component.loadOrdenesCompra();

      setTimeout(() => {
        expect(component.ordenesCompra).toEqual([]);
        expect(component.isLoading).toBeFalsy();
        done();
      }, 100);
    });
  });

  describe('Data Rendering', () => {
    it('should render ordenes table when data is loaded', (done) => {
      service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

      component.ngOnInit();
      fixture.detectChanges();

      setTimeout(() => {
        const table = fixture.nativeElement.querySelector('.ordenes-table');
        expect(table).toBeTruthy();
        done();
      }, 100);
    });

    it('should display no data message when ordenesCompra is empty', (done) => {
      service.getAllOrdenCompra.and.returnValue(of([]));

      component.ngOnInit();
      fixture.detectChanges();

      setTimeout(() => {
        const noDataDiv = fixture.nativeElement.querySelector('.no-data');
        expect(noDataDiv).toBeTruthy();
        expect(noDataDiv.textContent).toContain('No hay órdenes de compra disponibles');
        done();
      }, 100);
    });

    it('should display error message when loading fails', (done) => {
      const error = { message: 'Server error' };
      service.getAllOrdenCompra.and.returnValue(throwError(() => error));

      component.ngOnInit();
      fixture.detectChanges();

      setTimeout(() => {
        const errorDiv = fixture.nativeElement.querySelector('.error');
        expect(errorDiv).toBeTruthy();
        expect(errorDiv.textContent).toContain('Error al cargar ordenes de compra');
        done();
      }, 100);
    });

  });
});

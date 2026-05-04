import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioListComponent } from './inventario-list.component';
import { InventarioService } from '../inventario-service';
import { of } from 'rxjs';
import { Inventario } from '../inventario';
import { Producto } from '../../orden-compra/producto';
import { faker } from '@faker-js/faker';

describe('InventarioListComponent', () => {
  let component: InventarioListComponent;
  let fixture: ComponentFixture<InventarioListComponent>;
  let service: jasmine.SpyObj<InventarioService>;

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

  const mockInventario: Inventario = {
    id: faker.string.uuid() as any,
    producto: mockProducto,
    cantidad: faker.number.int({ min: 1, max: 50 }),
    tipoMovimiento: 'ENTRADA',
    fecha: faker.date.past(),
    descripcion: faker.lorem.sentence()
  };

  const mockList: Inventario[] = [
    mockInventario,
    {
      id: faker.string.uuid() as any,
      producto: mockProducto,
      cantidad: faker.number.int({ min: 1, max: 20 }),
      tipoMovimiento: 'SALIDA',
      fecha: faker.date.recent(),
      descripcion: faker.lorem.sentence()
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('InventarioService', ['getAllInventarios']);
    serviceSpy.getAllInventarios.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [InventarioListComponent],
      providers: [
        { provide: InventarioService, useValue: serviceSpy }
      ]
    }).compileComponents();

    service = TestBed.inject(InventarioService) as jasmine.SpyObj<InventarioService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar los inventarios correctamente', (done) => {
    service.getAllInventarios.and.returnValue(of(mockList));

    component.loadInventarios();

    setTimeout(() => {
      expect(component.inventarios).toEqual(mockList);
      expect(component.isLoading).toBeFalsy();
      expect(component.errorMessage).toBe('');
      done();
    }, 100);
  });
});
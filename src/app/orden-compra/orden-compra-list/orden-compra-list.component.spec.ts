import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenCompraListComponent } from './orden-compra-list.component';
import { OrdenCompraService } from '../orden-compra-service';
import { of } from 'rxjs';
import { OrdenCompra } from '../orden-compra';
import { Usuario } from '../usuario';
import { Producto } from '../producto';
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

  it('Crear el componente', () => {
    expect(component).toBeTruthy();
    expect(service).toBeTruthy();
  });


  it('Cargar las ordenes correctamente', () => {
    service.getAllOrdenCompra.and.returnValue(of(mockOrdenes));

    fixture.detectChanges();

    expect(component.ordenesCompra).toEqual(mockOrdenes);
    expect(component.isLoading).toBeFalsy();
    expect(component.errorMessage).toBe('');
  });
});

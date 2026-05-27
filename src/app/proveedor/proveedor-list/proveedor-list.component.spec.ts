import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProveedorListComponent } from './proveedor-list.component';
import { ProveedorService } from '../proveedor.service';
import { ProveedorDetailComponent } from '../proveedor-detail/proveedor-detail.component';

describe('ProveedorListComponent', () => {
  let component: ProveedorListComponent;
  let fixture: ComponentFixture<ProveedorListComponent>;
  let proveedorServiceSpy: jasmine.SpyObj<ProveedorService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ProveedorService', ['getProveedores', 'getProveedor']);
    serviceSpy.getProveedores.and.returnValue(of([]));
    serviceSpy.getProveedor.and.returnValue(of({
      id: '1',
      nombre: 'RC Parts',
      correo: 'rc@test.com',
      telefono: 123456,
      direccion: 'Calle 1',
      productos: []
    }));

    await TestBed.configureTestingModule({
      declarations: [ProveedorListComponent, ProveedorDetailComponent],
      providers: [
        { provide: ProveedorService, useValue: serviceSpy }
      ]
    }).compileComponents();

    proveedorServiceSpy = TestBed.inject(ProveedorService) as jasmine.SpyObj<ProveedorService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedorListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar proveedores al iniciar', () => {
    proveedorServiceSpy.getProveedores.and.returnValue(of([
      { id: '1', nombre: 'RC Parts', correo: 'rc@test.com', telefono: 123456, direccion: 'Calle 1' }
    ] as any));

    fixture.detectChanges();

    expect(proveedorServiceSpy.getProveedores).toHaveBeenCalled();
    expect(component.proveedores.length).toBe(1);
  });

  it('Debe cargar el detalle de un proveedor', () => {
    component.verDetalle({ id: '1', nombre: 'RC Parts', correo: 'rc@test.com', telefono: 123456, direccion: 'Calle 1' } as any);

    expect(proveedorServiceSpy.getProveedor).toHaveBeenCalledWith('1');
  });
});

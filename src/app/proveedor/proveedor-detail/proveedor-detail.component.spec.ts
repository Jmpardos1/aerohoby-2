import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorDetailComponent } from './proveedor-detail.component';

describe('ProveedorDetailComponent', () => {
  let component: ProveedorDetailComponent;
  let fixture: ComponentFixture<ProveedorDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProveedorDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorDetailComponent);
    component = fixture.componentInstance;
    component.proveedorDetail = {
      id: '1',
      nombre: 'RC Parts',
      correo: 'rc@test.com',
      telefono: 123456,
      direccion: 'Calle 1',
      productos: []
    };
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });
});

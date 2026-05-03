import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoDetailComponent } from './producto-detail.component';
import { Producto } from '../producto';

describe('ProductoDetailComponent', () => {
  let component: ProductoDetailComponent;
  let fixture: ComponentFixture<ProductoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoDetailComponent);
    component = fixture.componentInstance;
    component.productoDetail = {
      id: 1,
      nombre: 'Avion RC',
      descripcion: 'Producto de prueba',
      precio: 5000,
      stock: 10,
      stockMinimo: 2,
      categoria: [{ id: 1, nombre: 'Aviones', descripcion: '' }],
      marca: { id: 1, nombre: 'Marca prueba' } as any,
      imagen: '',
      proveedor: { id: 1, nombre: 'Proveedor prueba' } as any
    } as Producto;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

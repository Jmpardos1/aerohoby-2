import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticuloListComponent } from './articulo-list.component';
import { ArticuloService } from '../articulo.service';
import { ArticuloDetailComponent } from '../articulo-detail/articulo-detail.component';
import { ProductoService } from '../../producto/producto.service';
import { FormsModule } from '@angular/forms';

describe('ArticuloListComponent', () => {
  let component: ArticuloListComponent;
  let fixture: ComponentFixture<ArticuloListComponent>;
  let articuloServiceSpy: jasmine.SpyObj<ArticuloService>;
  let productoServiceSpy: jasmine.SpyObj<ProductoService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ArticuloService', ['getArticulos', 'getArticuloDetail']);
    const productoSpy = jasmine.createSpyObj('ProductoService', ['getProductos']);
    serviceSpy.getArticulos.and.returnValue(of([]));
    serviceSpy.getArticuloDetail.and.returnValue(of({
      id: '1',
      titulo: 'Guia de baterias',
      descripcion: 'Consejos',
      contenido: 'Contenido completo',
      fechaPublicacion: '2026-05-01',
      autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' },
      productos: []
    }));
    productoSpy.getProductos.and.returnValue(of([]));

    const authSpy = jasmine.createSpyObj('AuthService', ['getRol']);
    authSpy.getRol.and.returnValue('EXPERT');

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ArticuloListComponent, ArticuloDetailComponent],
      providers: [
        { provide: ArticuloService, useValue: serviceSpy },
        { provide: ProductoService, useValue: productoSpy }
      ]
    }).compileComponents();

    articuloServiceSpy = TestBed.inject(ArticuloService) as jasmine.SpyObj<ArticuloService>;
    productoServiceSpy = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticuloListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar articulos al iniciar', () => {
    articuloServiceSpy.getArticulos.and.returnValue(of([
      {
        id: '1',
        titulo: 'Guia de baterias',
        descripcion: 'Consejos',
        contenido: 'Contenido',
        fechaPublicacion: '2026-05-01',
        autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' },
        productos: []
      }
    ] as any));

    fixture.detectChanges();

    expect(articuloServiceSpy.getArticulos).toHaveBeenCalled();
    expect(productoServiceSpy.getProductos).toHaveBeenCalled();
    expect(component.articulos.length).toBe(1);
  });

  it('Debe cargar el detalle de un articulo', () => {
    component.verDetalle({
      id: '1',
      titulo: 'Guia de baterias',
      descripcion: 'Consejos',
      contenido: 'Contenido',
      fechaPublicacion: '2026-05-01',
      autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' } as any,
      productos: []
    } as any);

    expect(articuloServiceSpy.getArticuloDetail).toHaveBeenCalledWith('1');
  });

  it('Debe filtrar por texto, autor y producto asociado', () => {
    component.todosArticulos = [
      {
        id: '1',
        titulo: 'Guia de drones para principiantes',
        descripcion: 'Comparativa simple',
        contenido: 'Contenido',
        fechaPublicacion: '2026-05-01',
        autor: { id: 'u1', nombre: 'Valentina Drone', correo: 'val@test.com', telefono: '123', rol: 'EXPERT' } as any,
        productos: [{ id: 'p1', nombre: 'DJI Neo', descripcion: 'Drone ligero', precio: 10, stock: 1, stockMinimo: 1 }]
      },
      {
        id: '2',
        titulo: 'Setup FPV estable',
        descripcion: 'Consejos de vuelo',
        contenido: 'Contenido',
        fechaPublicacion: '2026-05-02',
        autor: { id: 'u2', nombre: 'Santiago Expert', correo: 'san@test.com', telefono: '456', rol: 'EXPERT' } as any,
        productos: [{ id: 'p2', nombre: 'RadioMaster Boxer', descripcion: 'Radio', precio: 20, stock: 1, stockMinimo: 1 }]
      }
    ] as any;

    component.textoBusqueda = 'radiomaster';
    expect(component.articulosFiltrados.length).toBe(1);
    expect(component.articulosFiltrados[0].id).toBe('2');

    component.textoBusqueda = '';
    component.autorSeleccionadoId = 'u1';
    expect(component.articulosFiltrados.length).toBe(1);
    expect(component.articulosFiltrados[0].id).toBe('1');

    component.autorSeleccionadoId = null;
    component.productoSeleccionadoId = 'p2';
    expect(component.articulosFiltrados.length).toBe(1);
    expect(component.articulosFiltrados[0].id).toBe('2');
  });
});

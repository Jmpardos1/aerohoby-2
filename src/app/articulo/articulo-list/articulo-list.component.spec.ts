import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ArticuloListComponent } from './articulo-list.component';
import { ArticuloService } from '../articulo.service';
import { ArticuloDetailComponent } from '../articulo-detail/articulo-detail.component';
import { AuthService } from '../../usuario/auth.service';

describe('ArticuloListComponent', () => {
  let component: ArticuloListComponent;
  let fixture: ComponentFixture<ArticuloListComponent>;
  let articuloServiceSpy: jasmine.SpyObj<ArticuloService>;

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('ArticuloService', ['getArticulos', 'getArticuloDetail']);
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

    const authSpy = jasmine.createSpyObj('AuthService', ['getRol']);
    authSpy.getRol.and.returnValue('EXPERT');

    await TestBed.configureTestingModule({
      declarations: [ArticuloListComponent, ArticuloDetailComponent],
      providers: [
        { provide: ArticuloService, useValue: serviceSpy },
        { provide: AuthService, useValue: authSpy }
      ]
    }).compileComponents();

    articuloServiceSpy = TestBed.inject(ArticuloService) as jasmine.SpyObj<ArticuloService>;
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
        autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' }
      }
    ] as any));

    fixture.detectChanges();

    expect(articuloServiceSpy.getArticulos).toHaveBeenCalled();
    expect(component.articulos.length).toBe(1);
  });

  it('Debe cargar el detalle de un articulo', () => {
    component.verDetalle({
      id: '1',
      titulo: 'Guia de baterias',
      descripcion: 'Consejos',
      contenido: 'Contenido',
      fechaPublicacion: '2026-05-01',
      autor: { id: 'u1', nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' } as any
    } as any);

    expect(articuloServiceSpy.getArticuloDetail).toHaveBeenCalledWith('1');
  });
});

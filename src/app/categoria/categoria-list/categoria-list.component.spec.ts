import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CategoriaListComponent } from './categoria-list.component';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

describe('CategoriaListComponent', () => {
  let component: CategoriaListComponent;
  let fixture: ComponentFixture<CategoriaListComponent>;
  let categoriaServiceSpy: jasmine.SpyObj<CategoriaService>;

  const mockCategorias: Categoria[] = [
    {
      id: 1,
      nombre: 'Aviones',
      descripcion: 'Modelos a escala y vuelo recreativo'
    },
    {
      id: 2,
      nombre: 'Baterias',
      descripcion: 'Fuentes de energia para equipos RC'
    }
  ];

  beforeEach(async () => {
    const serviceSpy = jasmine.createSpyObj('CategoriaService', ['getCategorias']);
    serviceSpy.getCategorias.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      declarations: [CategoriaListComponent],
      providers: [
        { provide: CategoriaService, useValue: serviceSpy }
      ]
    }).compileComponents();

    categoriaServiceSpy = TestBed.inject(CategoriaService) as jasmine.SpyObj<CategoriaService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaListComponent);
    component = fixture.componentInstance;
  });

  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe cargar las categorias al iniciar', () => {
    categoriaServiceSpy.getCategorias.and.returnValue(of(mockCategorias));

    fixture.detectChanges();

    expect(categoriaServiceSpy.getCategorias).toHaveBeenCalled();
    expect(component.categorias).toEqual(mockCategorias);
    expect(component.isLoading).toBeFalse();
  });
});

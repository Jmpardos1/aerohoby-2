import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticuloDetailComponent } from './articulo-detail.component';

describe('ArticuloDetailComponent', () => {
  let component: ArticuloDetailComponent;
  let fixture: ComponentFixture<ArticuloDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticuloDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ArticuloDetailComponent);
    component = fixture.componentInstance;
    component.articuloDetail = {
      id: '1',
      titulo: 'Guia de baterias',
      descripcion: 'Consejos',
      contenido: 'Contenido completo',
      fechaPublicacion: '2026-05-01',
      autor: { id: 1, nombre: 'Experto', correo: 'exp@test.com', telefono: '123', rol: 'EXPERT' } as any,
      productos: []
    };
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });
});

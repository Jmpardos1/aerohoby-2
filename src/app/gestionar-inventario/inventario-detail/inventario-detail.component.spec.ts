import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InventarioDetailComponent } from './inventario-detail.component';

describe('InventarioDetailComponent', () => {
  let component: InventarioDetailComponent;
  let fixture: ComponentFixture<InventarioDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventarioDetailComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(InventarioDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });
});
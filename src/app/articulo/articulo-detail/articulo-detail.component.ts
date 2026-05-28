import { Component, Input } from '@angular/core';
import { ArticuloDetail } from '../articulo-detail';

@Component({
  selector: 'app-articulo-detail',
  standalone: false,
  templateUrl: './articulo-detail.component.html',
  styleUrl: './articulo-detail.component.css',
})
export class ArticuloDetailComponent {
  @Input() articuloDetail!: ArticuloDetail | null;
}

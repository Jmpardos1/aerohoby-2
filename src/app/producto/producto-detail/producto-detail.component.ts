import { Component, Input, OnInit } from '@angular/core';
import { Producto } from '../producto';

@Component({
  selector: 'app-producto-detail',
  standalone: false,
  templateUrl: './producto-detail.component.html',
  styleUrl: './producto-detail.component.css',
})
export class ProductoDetailComponent implements OnInit {
  @Input() productoDetail!: Producto;

  constructor() { }
  ngOnInit(): void {}

}

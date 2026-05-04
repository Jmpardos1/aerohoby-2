import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Inventario } from '../inventario';

@Component({
  selector: 'app-inventario-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inventario-detail.component.html',
  styleUrls: ['./inventario-detail.component.css']
})
export class InventarioDetailComponent implements OnInit {

  @Input() inventario!: Inventario | null;

  constructor() {}

  ngOnInit(): void {}
}
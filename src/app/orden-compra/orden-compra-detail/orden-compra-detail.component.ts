import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdenCompra } from '../orden-compra';

@Component({
  selector: 'app-orden-compra-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orden-compra-detail.component.html',
  styleUrls: ['./orden-compra-detail.component.css'],
})
export class OrdenCompraDetailComponent implements OnInit{

  @Input() ordenCompra!: OrdenCompra | null;

  constructor() { }

  ngOnInit(): void {

    
    
  }
}

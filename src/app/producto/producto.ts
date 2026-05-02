import { Categoria } from '../categoria/categoria';
import { Marca } from '../marca/marca';
import { Proveedor } from '../proveedor/proveedor';

export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    stockMinimo: number;
    categoria: Array<Categoria>;
    marca: Marca;
    imagen: string;
    proveedor: Proveedor;

    constructor(id: number, nombre: string, descripcion: string, precio: number, stock: number, stockMinimo: number, 
        categoria: Array<Categoria>, marca: Marca, imagen: string, proveedor: Proveedor) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.stockMinimo = stockMinimo;
        this.categoria = categoria;
        this.marca = marca;
        this.proveedor = proveedor;
        this.imagen = imagen;
    }
}

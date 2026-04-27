

// DTO TIENE LOS ATRIBUTOS DE LA CLASE


export class Producto {

    id: number;
    nombre: string;
    descripcion: string;
    precio: number;
    stock: number;
    stockMinimo: number;
    marcaId: number;
    prooveedorId: number;

    constructor(id: number, nombre: string, descripcion: string, precio: number, stock: number, stockMinimo: number, marcaId: number, prooveedorId: number) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.stockMinimo = stockMinimo;
        this.marcaId = marcaId;
        this.prooveedorId = prooveedorId;
    }
    
}

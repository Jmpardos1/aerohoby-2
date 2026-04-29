import { Usuario } from "./usuario";
import { Producto } from "./producto";

export class OrdenCompra {
    id!: any;
    fechaOrden!: Date;
    estadoPedido!: string;
    usuario!: Usuario;
    producto!: Producto;
}
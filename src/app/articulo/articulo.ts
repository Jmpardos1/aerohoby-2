import { Usuario } from "../usuario/usuario";
import { ProductoSummary } from "../producto/producto-summary";

export class Articulo {
    id: any;
    titulo: string;
    descripcion: string;
    contenido: string;
    fechaPublicacion: string | Date;
    autor: Usuario;
    productos: ProductoSummary[];

    constructor(
        id: any,
        titulo: string,
        descripcion: string,
        contenido: string,
        fechaPublicacion: string | Date,
        autor: Usuario,
        productos: ProductoSummary[] = []
    ) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.autor = autor;
        this.productos = productos;
    }
}

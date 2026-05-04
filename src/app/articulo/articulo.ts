import { Usuario } from "../usuario/usuario";

export class Articulo {
    id: any;
    titulo: string;
    descripcion: string;
    contenido: string;
    fechaPublicacion: string | Date;
    autor: Usuario;

    constructor(id: any, titulo: string, descripcion: string, contenido: string, fechaPublicacion: string | Date, autor: Usuario) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.autor = autor;
    }
}

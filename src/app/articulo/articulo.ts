import { Usuario } from "../usuario/usuario";

export class Articulo {
    id: number;
    titulo: string;
    descripcion: string;
    contenido: string;
    fechaPublicacion: Date;
    autor: Usuario;

    constructor(id: number, titulo: string, descripcion: string, contenido: string, fechaPublicacion: Date, autor: Usuario) {
        this.id = id;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.contenido = contenido;
        this.fechaPublicacion = fechaPublicacion;
        this.autor = autor;
    }
}

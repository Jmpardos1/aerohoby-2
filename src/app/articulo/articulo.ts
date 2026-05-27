export interface Articulo {
  id: string;
  titulo: string;
  descripcion: string;
  contenido: string;
  fechaPublicacion: string;
  autor: { id: string; nombre: string; correo: string };
}

export interface Comentario {
  id: string;
  contenido: string;
  fecha: string;
  autorId: string;
  autorNombre: string;
}

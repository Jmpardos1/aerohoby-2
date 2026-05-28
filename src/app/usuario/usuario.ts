export class Usuario {
    id: any;
    nombre: string;
    imagenUrl?: string;
    correo: string;
    telefono: string;
    rol: string;
    direcciones?: string[];

    constructor(id: any, nombre: string, correo: string, telefono: string, rol: string, imagenUrl?: string) {
        this.id = id;
        this.nombre = nombre;
        this.imagenUrl = imagenUrl;
        this.correo = correo;
        this.telefono = telefono;
        this.rol = rol;
        this.direcciones = [];
    }
}

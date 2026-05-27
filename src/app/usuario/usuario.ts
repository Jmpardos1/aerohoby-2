export class Usuario {
    id: any;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;

    constructor(id: any, nombre: string, correo: string, telefono: string, rol: string) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.rol = rol;
    }
}

export class Usuario {
    id: number;
    nombre: string;
    correo: string;
    telefono: string;
    rol: string;
    direcciones: string[];

    constructor(id: number, nombre: string, correo: string, telefono: string, rol: string, direcciones: string[] = []) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.rol = rol;
        this.direcciones = direcciones;
    }
}
